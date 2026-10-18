#!/usr/bin/env bash
# Deploy Muzakkir PWA + API to Oracle Ubuntu server
set -euo pipefail

SERVER_HOST="${DEPLOY_HOST:-92.5.234.30}"
SERVER_USER="${DEPLOY_USER:-ubuntu}"
SSH_KEY="${DEPLOY_KEY:-$HOME/Desktop/ssh-key-2026-06-26.key}"
APP_NAME="muzakkir"
REMOTE_DIR="/var/www/${APP_NAME}"
SERVICE_PORT="${APP_PORT:-3001}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
  echo "==> Loaded .env (VAPID: ${VAPID_PUBLIC_KEY:+yes}${VAPID_PUBLIC_KEY:-no})"
fi

if [[ ! -f "$SSH_KEY" ]]; then
  echo "SSH key not found: $SSH_KEY"
  exit 1
fi

chmod 600 "$SSH_KEY"

echo "==> Regenerating app icons..."
node scripts/generate-icon-5bars.mjs

echo "==> Building PWA..."
npm run deploy:pwa

echo "==> Uploading to ${SERVER_USER}@${SERVER_HOST}..."
rsync -avz --delete \
  -e "ssh -i ${SSH_KEY} -o StrictHostKeyChecking=accept-new" \
  --exclude node_modules \
  --exclude .env \
  --exclude android \
  --exclude ios \
  --exclude .git \
  --exclude dist/.vite \
  "$ROOT/" "${SERVER_USER}@${SERVER_HOST}:/tmp/muzakkir-deploy/"

echo "==> Installing on server..."
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=accept-new "${SERVER_USER}@${SERVER_HOST}" \
  "APP_NAME='${APP_NAME}' REMOTE_DIR='${REMOTE_DIR}' SERVICE_PORT='${SERVICE_PORT}' \
VAPID_PUBLIC_KEY='${VAPID_PUBLIC_KEY:-}' VAPID_PRIVATE_KEY='${VAPID_PRIVATE_KEY:-}' \
VAPID_EMAIL='${VAPID_EMAIL:-mailto:support@muzakkir.app}' bash -s" << 'REMOTE'
set -euo pipefail

APP_NAME="${APP_NAME:-muzakkir}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/muzakkir}"
SERVICE_PORT="${SERVICE_PORT:-3001}"

if ! command -v node >/dev/null 2>&1; then
  echo "Installing Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

if ! command -v nginx >/dev/null 2>&1; then
  echo "Installing nginx..."
  sudo apt-get update -qq
  sudo apt-get install -y nginx
fi

echo "Node $(node -v), npm $(npm -v)"

# Keep published APK when PWA dist is replaced (deploy:oracle alone must not break /downloads/)
APK_BACKUP=""
if [[ -f "$REMOTE_DIR/dist/downloads/muzakkir.apk" ]]; then
  APK_BACKUP="$(mktemp)"
  cp "$REMOTE_DIR/dist/downloads/muzakkir.apk" "$APK_BACKUP"
  echo "Preserving existing APK for downloads/"
fi

sudo mkdir -p "$REMOTE_DIR"
sudo rsync -a --delete /tmp/muzakkir-deploy/ "$REMOTE_DIR/"
sudo chown -R ubuntu:ubuntu "$REMOTE_DIR"

if [[ -n "$APK_BACKUP" && -f "$APK_BACKUP" ]]; then
  sudo mkdir -p "$REMOTE_DIR/dist/downloads"
  sudo cp "$APK_BACKUP" "$REMOTE_DIR/dist/downloads/muzakkir.apk"
  sudo chown -R ubuntu:ubuntu "$REMOTE_DIR/dist/downloads"
  rm -f "$APK_BACKUP"
  echo "Restored dist/downloads/muzakkir.apk"
fi

cd "$REMOTE_DIR"
npm ci --omit=dev

VAPID_LINES=""
if [[ -n "${VAPID_PUBLIC_KEY:-}" && -n "${VAPID_PRIVATE_KEY:-}" ]]; then
  VAPID_LINES="Environment=VAPID_PUBLIC_KEY=${VAPID_PUBLIC_KEY}
Environment=VAPID_PRIVATE_KEY=${VAPID_PRIVATE_KEY}
Environment=VAPID_EMAIL=${VAPID_EMAIL:-mailto:support@muzakkir.app}"
  echo "Web Push VAPID keys configured"
else
  echo "Web Push: no VAPID keys (add to .env on Mac before deploy)"
fi

sudo tee /etc/systemd/system/${APP_NAME}.service > /dev/null << EOF
[Unit]
Description=Muzakkir PWA + API
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=${REMOTE_DIR}
Environment=NODE_ENV=production
Environment=SERVE_STATIC=true
Environment=PORT=${SERVICE_PORT}
${VAPID_LINES}
ExecStart=/usr/bin/node server/index.js
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo tee /etc/nginx/sites-available/${APP_NAME} > /dev/null << EOF
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    client_max_body_size 10m;

    location = / {
        return 302 /muzakkir/;
    }

    location = /muzakkir {
        return 301 /muzakkir/;
    }

    # Strip /muzakkir prefix → Node (PWA + API static)
    location /muzakkir/ {
        proxy_pass http://127.0.0.1:${SERVICE_PORT}/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Absolute /api/* used by the PWA
    location /api/ {
        proxy_pass http://127.0.0.1:${SERVICE_PORT}/api/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Qutub static PWA (deployed separately to /var/www/qutub)
    location = /qutub {
        return 301 /qutub/;
    }
    location /qutub/ {
        root /var/www;
        try_files \$uri \$uri/ /qutub/index.html;
    }

    # PropertyWebsite static (deployed separately to /var/www/property)
    location = /property {
        return 301 /property/;
    }
    location /property/images/ {
        root /var/www;
        try_files \$uri =404;
        expires 7d;
        add_header Cache-Control "public";
    }
    location /property/ {
        root /var/www;
        try_files \$uri \$uri/ /property/index.html;
    }

    location = /realestate {
        return 301 /property/;
    }
    location /realestate/ {
        return 301 /property/;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/${APP_NAME} /etc/nginx/sites-enabled/${APP_NAME}
sudo rm -f /etc/nginx/sites-enabled/default

sudo systemctl daemon-reload
sudo systemctl enable ${APP_NAME}
sudo systemctl restart ${APP_NAME}
sudo nginx -t
sudo systemctl reload nginx

# Oracle Ubuntu images block all ports except 22 in iptables
if sudo iptables -L INPUT -n | grep -q "reject-with icmp-host-prohibited"; then
  sudo iptables -C INPUT -p tcp --dport 80 -j ACCEPT 2>/dev/null || \
    sudo iptables -I INPUT 4 -p tcp --dport 80 -j ACCEPT
  sudo iptables -C INPUT -p tcp --dport 443 -j ACCEPT 2>/dev/null || \
    sudo iptables -I INPUT 5 -p tcp --dport 443 -j ACCEPT
  sudo DEBIAN_FRONTEND=noninteractive apt-get install -y iptables-persistent >/dev/null 2>&1 || true
  sudo netfilter-persistent save 2>/dev/null || sudo sh -c "iptables-save > /etc/iptables/rules.v4" 2>/dev/null || true
fi

# Local firewall (if ufw active)
if command -v ufw >/dev/null 2>&1 && sudo ufw status | grep -q "Status: active"; then
  sudo ufw allow 80/tcp
  sudo ufw allow 443/tcp
fi

sleep 2
curl -sf "http://127.0.0.1:${SERVICE_PORT}/api/health" && echo ""
curl -sf -o /dev/null -w "Root / → HTTP %{http_code}\n" "http://127.0.0.1/" || true
curl -sf -o /dev/null -w "Muzakkir /muzakkir/ → HTTP %{http_code}\n" "http://127.0.0.1/muzakkir/" || true
curl -sf -o /dev/null -w "Property /property/ → HTTP %{http_code}\n" "http://127.0.0.1/property/" || true

echo "Deploy on server finished."
REMOTE

echo ""
echo "=========================================="
echo "  Muzakkir deployed!"
echo "  http://${SERVER_HOST}/muzakkir/"
echo "  http://${SERVER_HOST}/api/health"
echo "=========================================="
echo ""
echo "If site is unreachable from browser, open port 80 in Oracle Cloud:"
echo "  Networking -> Virtual cloud networks -> Security List -> Ingress -> TCP 80"

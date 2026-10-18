#!/usr/bin/env bash
# Enable HTTPS on Oracle server with Let's Encrypt (requires a domain name)
set -euo pipefail

SERVER_HOST="${DEPLOY_HOST:-92.5.234.30}"
SERVER_USER="${DEPLOY_USER:-ubuntu}"
SSH_KEY="${DEPLOY_KEY:-$HOME/Desktop/ssh-key-2026-06-26.key}"
APP_NAME="${APP_NAME:-muzakkir}"
SERVICE_PORT="${APP_PORT:-3001}"
DOMAIN="${DEPLOY_DOMAIN:-${1:-}}"

if [[ -z "$DOMAIN" ]]; then
  echo "Usage: DEPLOY_DOMAIN=your.domain.com bash scripts/setup-ssl.sh"
  echo "   or: bash scripts/setup-ssl.sh your.domain.com"
  echo ""
  echo "Before running:"
  echo "  1. Buy/use a domain (e.g. muzakkir.ru)"
  echo "  2. DNS A-record → ${SERVER_HOST}"
  echo "  3. Wait 5–30 min for DNS propagation"
  exit 1
fi

if [[ ! -f "$SSH_KEY" ]]; then
  echo "SSH key not found: $SSH_KEY"
  exit 1
fi

chmod 600 "$SSH_KEY"

if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

CERT_EMAIL="${VAPID_EMAIL#mailto:}"
CERT_EMAIL="${CERT_EMAIL:-admin@${DOMAIN}}"

echo "==> Domain: ${DOMAIN} → ${SERVER_HOST}"
echo "==> Email:  ${CERT_EMAIL}"
echo ""

ssh -i "$SSH_KEY" -o StrictHostKeyChecking=accept-new "${SERVER_USER}@${SERVER_HOST}" \
  "DOMAIN='${DOMAIN}' APP_NAME='${APP_NAME}' SERVICE_PORT='${SERVICE_PORT}' CERT_EMAIL='${CERT_EMAIL}' bash -s" << 'REMOTE'
set -euo pipefail

DOMAIN="${DOMAIN:?}"
APP_NAME="${APP_NAME:-muzakkir}"
SERVICE_PORT="${SERVICE_PORT:-3001}"
CERT_EMAIL="${CERT_EMAIL:?}"

echo "==> Checking DNS..."
RESOLVED=$(dig +short "$DOMAIN" A | head -1 || true)
if [[ -z "$RESOLVED" ]]; then
  echo "❌ DNS A-record for $DOMAIN not found. Point domain to this server first."
  exit 1
fi
echo "   $DOMAIN → $RESOLVED"

echo "==> Installing certbot..."
sudo apt-get update -qq
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y certbot python3-certbot-nginx

echo "==> Nginx HTTP config for certbot..."
sudo tee /etc/nginx/sites-available/${APP_NAME} > /dev/null << EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    client_max_body_size 10m;

    location / {
        proxy_pass http://127.0.0.1:${SERVICE_PORT};
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/${APP_NAME} /etc/nginx/sites-enabled/${APP_NAME}
sudo nginx -t
sudo systemctl reload nginx

echo "==> Requesting Let's Encrypt certificate..."
sudo certbot --nginx \
  -d "${DOMAIN}" \
  --non-interactive \
  --agree-tos \
  -m "${CERT_EMAIL}" \
  --redirect

echo "==> Auto-renewal timer..."
sudo systemctl enable certbot.timer 2>/dev/null || true
sudo systemctl start certbot.timer 2>/dev/null || true

# Port 443 in iptables (Oracle)
if sudo iptables -L INPUT -n | grep -q "reject-with icmp-host-prohibited"; then
  sudo iptables -C INPUT -p tcp --dport 443 -j ACCEPT 2>/dev/null || \
    sudo iptables -I INPUT 5 -p tcp --dport 443 -j ACCEPT
  sudo netfilter-persistent save 2>/dev/null || true
fi

echo ""
curl -sf "https://${DOMAIN}/api/health" && echo ""
echo "HTTPS ready: https://${DOMAIN}"
REMOTE

echo ""
echo "=========================================="
echo "  HTTPS enabled!"
echo "  https://${DOMAIN}"
echo "  https://${DOMAIN}/downloads/muzakkir.apk"
echo "=========================================="
echo ""
echo "Update bookmarks — use https:// not http://"

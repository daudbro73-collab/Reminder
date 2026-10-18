self.addEventListener('push', (event) => {
  let payload = { title: 'Muzakkir', body: '', tag: 'muzakkir' };
  try {
    if (event.data) payload = { ...payload, ...event.data.json() };
  } catch (_) {
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: '/pwa-192.png',
      badge: '/favicon.png',
      tag: payload.tag || 'muzakkir',
      data: payload.data || {},
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      if (list.length) return list[0].focus();
      return clients.openWindow('./');
    })
  );
});

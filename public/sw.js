self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "RandomTask";
  const options = {
    body: data.body || "Tid for en ny oppgave!",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    tag: data.tag || "task-reminder",
    requireInteraction: true,
    data: data.url || "/",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
});
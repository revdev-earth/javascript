/**
 * Ejercicio 1: Service Worker con estrategia Cache First
 * Enunciado:
 * Crea un Service Worker que almacene en caché los archivos estáticos
 * (HTML, CSS y JS). Cuando la app se abra, debe servir primero lo que
 * esté en caché y si no, descargarlo de la red.
 */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("pwa-cache-v1").then((cache) => {
      return cache.addAll(["/", "/index.html", "/styles.css", "/app.js"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

/**
 * Ejercicio 2: Estrategia Network First
 * Enunciado:
 * Implementa una estrategia donde primero se intente obtener los datos
 * desde la red, y si no hay conexión, se use el caché como respaldo.
 */
async function networkFirst(req) {
  try {
    const fresh = await fetch(req);
    const cache = await caches.open("dynamic-cache");
    cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cache = await caches.open("dynamic-cache");
    const cached = await cache.match(req);
    return cached || new Response("Sin conexión y sin caché disponible");
  }
}

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/api/")) {
    event.respondWith(networkFirst(event.request));
  }
});

/**
 * Ejercicio 3: Manifest.json dinámico
 * Enunciado:
 * Define un manifest.json para tu PWA con nombre, icono e inicio en index.html.
 * (En un archivo separado "manifest.json", pero aquí lo representamos en JS).
 */
const manifest = {
  name: "Mi PWA",
  short_name: "PWA",
  start_url: "/index.html",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#317EFB",
  icons: [
    {
      src: "icons/icon-192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "icons/icon-512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
};
console.log("Manifest definido:", manifest);

/**
 * Ejercicio 4: App Shell Model
 * Enunciado:
 * Implementa un patrón App Shell: cachea la UI estática (HTML, CSS, JS)
 * para que siempre esté disponible offline, y carga los datos dinámicos
 * desde la red cuando haya conexión.
 */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("app-shell").then((cache) => {
      return cache.addAll(["/", "/index.html", "/styles.css", "/app.js"]);
    })
  );
});
self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/api/")) {
    event.respondWith(networkFirst(event.request));
  } else {
    event.respondWith(
      caches.match(event.request).then((res) => res || fetch(event.request))
    );
  }
});

/**
 * Ejercicio 5: Push Notifications
 * Enunciado:
 * Implementa en el Service Worker la capacidad de mostrar una notificación push
 * con un mensaje y un icono al recibir un evento push.
 */
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  event.waitUntil(
    self.registration.showNotification(data.title || "Nuevo mensaje", {
      body: data.body || "Tienes una nueva notificación",
      icon: "/icons/icon-192.png",
    })
  );
});

/**
 * Ejercicio 6: Instalación de la PWA
 * Enunciado:
 * Captura el evento `beforeinstallprompt` para mostrar un botón personalizado
 * que permita instalar la PWA.
 */
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.createElement("button");
  installBtn.textContent = "Instalar App";
  document.body.appendChild(installBtn);

  installBtn.addEventListener("click", async () => {
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    console.log("Resultado instalación:", choice.outcome);
    deferredPrompt = null;
  });
});

import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import { createHandlerBoundToURL } from "workbox-precaching";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

// Injected precache manifest by VitePWA
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// Fallback for navigation routes (React Router)
const handler = createHandlerBoundToURL("/index.html");
const navigationRoute = new NavigationRoute(handler);
registerRoute(navigationRoute);

// Cache Google Fonts stylesheets
registerRoute(
  ({ url }) => url.origin === "https://fonts.googleapis.com",
  new StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

// Cache Google Fonts webfont files
registerRoute(
  ({ url }) => url.origin === "https://fonts.gstatic.com",
  new CacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        maxEntries: 30,
      }),
    ],
  })
);

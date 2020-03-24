/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts("/ServiceWorkerSample/precache-manifest.abd156b5e0845e989df09649b94ac684.js");

workbox.core.setCacheNameDetails({ prefix: "pwatest" });
window.addEventListener('load', function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("service-worker.js");
    navigator.serviceWorker.ready.then(function(registration) {
        return registration.pushManager.getSubscription().then(function(subscription) {
          if (subscription) {
            return subscription;
          }
          return registration.pushManager.subscribe({
            userVisibleOnly: true
          })
        })
    }).then(function(subscription) {
        console.log("pushManager endpoint:", subscription.endpoint) 
    }).catch(function(error) {
        console.warn("serviceWorker error:", error)
    })
  }
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
self.addEventListener("push", function(event) {
  event.waitUntil(
    self.registration.pushManager
      .getSubscription()
      .then(function(subscription) {
        if (subscription) {
          return subscription.endpoint;
        }
        throw new Error("User not subscribed");
      })
      .then(function(res) {
        return self.registration.showNotification("title", {
          body: "contents"
        });
      })
  );
});
/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

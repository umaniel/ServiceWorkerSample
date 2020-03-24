/* eslint-disable no-console */

import { register } from 'register-service-worker'

const decodeBase64URL = (data) => {
  if(typeof data !== 'string')
    return null;
  let decoded = atob(data.replace(/\-/g, '+').replace(/_/g, '/'));
  let buffer = new Uint8Array(decoded.length);
  for(let i = 0 ; i < data.length ; i++)
    buffer[i] = decoded.charCodeAt(i);
  return buffer;
}

const key = 'BK59rlKj64FC_fcHIqeVWxE2YlSN_OPaNSuEdUbmooNT5lvONjd3HOdEGQoLghGPOpliS8kh2v-PWJZJrhFbN5s'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready (registration) {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
      return registration.pushManager.getSubscription().then(function(subscription) {
        if (subscription) {
          return subscription;
        }
        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: decodeBase64URL(key)
        })
      })
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}

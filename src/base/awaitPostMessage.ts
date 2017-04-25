export function awaitPostMessage() {
  let isReactNativePostMessageReady = false
  const queue = []
  let currentPostMessageFn = function store(message) {
    queue.push(message)
  }

  if (!isReactNativePostMessageReady) {
    Object.defineProperty(window, 'postMessage', {
      configurable: true,
      enumerable: true,
      get() {
        return currentPostMessageFn
      },
      set(fn) {
        currentPostMessageFn = fn
        isReactNativePostMessageReady = true
        setTimeout(sendQueue, 0)
      }
    })
  }

  function sendQueue() {
    while (queue.length > 0) {
      window.postMessage(queue.shift(), null)
    }
  }

}

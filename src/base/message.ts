import { awaitPostMessage } from './awaitPostMessage'

export type callbackFn = (data: any) => void

export class Message {

  private callbacks: callbackFn[] = []

  private queueBeforeDomLoaded = []
  private isDomLoaded = false

  constructor() {
    awaitPostMessage()
    document.addEventListener('message', (event) => {
      let data
      try {
        data = JSON.parse(event['data'])
      } catch (error) {
        throw new Error('JSON parse from native data error')
      }
      if (!this.isDomLoaded) {
        this.queueBeforeDomLoaded.push(data)
      }
      this.trigger(data)
    })

    window.addEventListener('DOMContentLoaded', () => {
      this.isDomLoaded = true
      this.queueBeforeDomLoaded.forEach((data) => {
        this.trigger(data)
      })
    })
  }

  private trigger(data) {
    this.callbacks.forEach((callback) => {
      callback(data)
    })
  }

  mock(data) {
    this.trigger(data)
  }

  checkCallbackIsAlready(callback: callbackFn): boolean {
    return this.callbacks.some((cb) => {
      return cb === callback
    })
  }

  subscribe(callback: callbackFn): void {
    this.callbacks.push(callback)
  }

  unsubcribe(callback: callbackFn): void {
    this.callbacks = this.callbacks.filter((cb) => {
      return cb !== callback
    })
  }

  post(data: any, from: string = 'webview'): void {
    window.postMessage(
      JSON.stringify({
        from,
        data
      }),
      null
    )
  }

}

export default new Message()

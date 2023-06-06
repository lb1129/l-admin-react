type Key = symbol
type Handler = (...args: unknown[]) => void
interface Record {
  handler: Handler
  once: boolean
}

class Pubsub {
  store: Map<Key, Record[]>
  constructor() {
    this.store = new Map()
  }
  on(key: Key, handler: Handler, once?: boolean) {
    const record: Record = { handler, once: !!once }
    if (this.store.has(key)) {
      const records = this.store.get(key)
      records?.push(record)
    } else {
      this.store.set(key, [record])
    }
  }
  off(key: Key, handler: Handler) {
    if (this.store.has(key)) {
      const records = this.store.get(key)
      const handlerIndex = records?.findIndex((record) => record.handler === handler)
      if (handlerIndex || handlerIndex === 0) records?.splice(handlerIndex, 1)
    }
  }
  emit(key: Key, ...args: unknown[]) {
    if (this.store.has(key)) {
      const records = this.store.get(key)
      records?.forEach((record) => {
        record.handler(...args)
        if (record.once) {
          this.off(key, record.handler)
        }
      })
    }
  }
  once(key: Key, handler: Handler) {
    this.on(key, handler, true)
  }
}

export default Pubsub

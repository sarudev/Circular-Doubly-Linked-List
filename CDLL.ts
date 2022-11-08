export default class CDLL<T> {
  private _start: Node<T> | null
  private _end: Node<T> | null
  private _length: number

  public constructor () {
    this.start = null
    this.end = null
    this.length = 0
  }

  public get start (): Node<T> | null {
    return this._start
  }

  private set start (start: Node<T> | null) {
    this._start = start
  }

  public get end (): Node<T> | null {
    return this._end
  }

  private set end (end: Node<T> | null) {
    this._end = end
  }

  public get length (): number {
    return this._length
  }

  private set length (length: number) {
    this._length = length
  }

  public at (index: number): T | null {
    if (this.length === 0)
      return null

    let node = this.start
    if (index > 0) {
      for (let i = 0; i < index; i++)
        node = node!.next
    } else {
      for (let i = 0; i > index; i--)
        node = node!.prev
    }
    return node!.value
  }

  public push (value: T): void {
    if (this.start == null) {
      const node = new Node<T>(null, value, null)
      this.start = node
      this.end = this.start
      this.start.next = this.end
      this.start.prev = this.end
    } else {
      const node = new Node(this.end, value, this.start)
      this.end!.next = node
      this.start.prev = node
      this.end = node
    }
    this.length++
  }

  public delete (index: number): void {
    if (this.length === 0)
      return

    let node = this.start
    for (let i = 0; i < index; i++)
      node = node!.next

    const prev = node!.prev
    const next = node!.next
    prev!.next = next
    next!.prev = prev
    if (node === this.start)
      this.start = next
    if (node === this.end)
      this.end = prev
    this.length--
  }

  public map<Type> (cb: (value: T) => Type): Type[] {
    const arr: Type[] = []
    for (const node of this)
      arr.push(cb(node!))

    return arr
  }

  public find (cb: (value: T) => boolean): T | undefined {
    for (const node of this) {
      if (cb(node!))
        return node!
    }
  }

  public findIndex (cb: (value: T, index: number) => boolean): number {
    for (let i = 0; i < this.length; i++) {
      if (cb(this.at(i)!, i))
        return i
    }
    return -1
  }

  public forEach (cb: (value: T, index: number) => unknown): void {
    for (let i = 0; i < this.length; i++)
      cb(this.at(i)!, i)
  }

  public includes (cb: (value: T) => boolean): boolean {
    for (const node of this) {
      if (cb(node!))
        return true
    }
    return false
  }

  /* eslint-disable */
  public * [Symbol.iterator] () {
    for (let i = 0; i < this.length; i++) {
      yield this.at(i)
    }
  }
  /* eslint-enable */
}

class Node<T> {
  private _prev: Node<T> | null
  private _value: T | null
  private _next: Node<T> | null

  public constructor (prev: Node<T> | null = null, value: T | null = null, next: Node<T> | null = null) {
    this.prev = prev
    this.value = value
    this.next = next
  }

  public get prev (): Node<T> | null {
    return this._prev
  }

  public set prev (prev: Node<T> | null) {
    this._prev = prev
  }

  public get value (): T | null {
    return this._value
  }

  public set value (value: T | null) {
    this._value = value
  }

  public get next (): Node<T> | null {
    return this._next
  }

  public set next (next: Node<T> | null) {
    this._next = next
  }
}

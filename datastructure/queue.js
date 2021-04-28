class Queue {
  items = []

  enQueue(element) { //加入队列
    return this.items.push(element)
  }

  deQueue() { //从队列中取出值并删除
    return this.items.shift()
  }

  front() {
    return this.items[0]
  }

  isEmpty() {
    return this.items.length === 0
  }

  size() {
    return this.items.length
  }

  toString() {
    return this.items.join(' ')
  }
}

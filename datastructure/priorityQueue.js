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
    return this.items.length == 0
  }

  size() {
    return this.items.length
  }

  toString() {
    let resultString = ""
    for (let i = 0; i < this.items.length; i++) {
      resultString += this.items[i] + " "
    }
    return resultString
  }
}

class PriorityQueue extends Queue { //继承普通队列
  enQueue(element, priority) { //改写队列为优先级队列
    const queueItem = new QueueItem(element, priority)
    let isAdd = true

    for (let i = 0; i < this.items.length; i++) {
      if (queueItem.priority > this.items[i].priority) {
        this.items.splice(i, 0, queueItem)
        isAdd = false
        break
      }
    }

    if (isAdd) {
      this.items.push(queueItem)
    }
  }
}

class QueueItem {  //辅助类 存放数据与优先级
  constructor(element, priority) {
    this.element = element
    this.priority = priority
  }
}

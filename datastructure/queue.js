function Queue() {  //队列先进先出
  this.items = []

  Queue.prototype.enQueue = function (element) { //加入队列
    this.items.push(element)
  }

  Queue.prototype.deQueue = function () { //取出并删除-队列值
    return this.items.shift()
  }

  Queue.prototype.front = function () { //查看第一个值
    return this.items[0]
  }

  Queue.prototype.size = function () { //计算队列长度
    return this.items.length
  }

  Queue.prototype.toString = function () { //输出队列值
    let resultString = ""

    for (let i = 0; i < this.items.length; i++) {
      resultString += this.items[i] + ""
    }

    return resultString
  }

}

function Stack() {
  this.item = []

  Stack.prototype.push = function (element) {  //添加元素
    this.item.push(element)
  }

  Stack.prototype.pop = function () { //取出元素返回 并删除
    return this.item.pop()
  }

  Stack.prototype.peek = function () { //查看元素
    return this.item[this.item.length - 1]
  }

  Stack.prototype.isEmpty = function () { //判断栈是否为空
    return this.item.length == 0
  }

  Stack.prototype.size = function () { //查看栈的长度
    return this.item.length
  }

  Stack.prototype.toString = function () { //输出栈内元素
    let resultString = ""
    for (let i = 0; i < this.item.length; i++) {
      resultString += this.item[i] + " "
    }
    return resultString
  }

}


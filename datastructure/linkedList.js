class LinkedList {
  head = null
  length = 0

  append(element) {  //添加一个元素
    const node = new Node(element)

    if (this.head === null) { //如果链表为空 则节点为头几点
      this.head = node
    } else {
      let current = this.head

      while (current.next) {  // 循环到尾节点
        current = current.next
      }
      current.next = node
    }
    this.length++
  }

  insert(position, element) {      //插入节点
    if (position < 0 || position > this.length) { //解决跨界
      throw new Error('overstep the boundary')
    }
    const node = new Node(element)

    if (position === 0) {  //判断是否插入节点为头节点
      node.next = this.head
      this.head = node
    } else {
      let needle = this.head
      while (position-- > 1) { //循环到插入节点的前一个节点
        needle = needle.next
      }
      const nextNode = needle.next
      needle.next = node
      node.next = nextNode
    }
    this.length++
  }

  removeAt(position) { //删除节点
    if (position < 0 || position >= this.length) {
      throw new Error('overstep the boundary')
    }
    let needle = null

    if (position === 0) {  //如果为头节点 把头节点改为删除节点指向的节点
      needle = this.head
      this.head = this.head.next
    } else {
      let current = this.head
      while (position-- > 1) {  //循环到前一个节点 
        current = current.next
      }
      needle = current.next
      current.next = needle.next
    }
    this.length--
    return needle
  }

  indexOf(element) {  //查询数据位置
    let index = 0
    let current = this.head

    while (current) { //当数据相同时返回下标
      if (current.element === element) return index
      current = current.next
      index++
    }
    return -1
  }

  remove(element) {  //根据指定数据删除节点
    return this.removeAt(this.indexOf(element))
  }

  getHead() { //获取头节点
    return this.head
  }

  isEmpty() {  //判断节点是否为空
    return this.length === 0
  }

  size() {  //返回节点长度
    return this.length
  }

  toString() { //把节点遍历为字符串
    let current = this.head
    let arr = []
    while (current) {
      arr.push(current.element)
      current = current.next
    }
    return arr.join('->')
  }
}

class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}
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


//解决哈希表冲突->分离链接法
class HashTable_L {
  items = []

  loseloseHashCode(key) {  //ascii哈希算法->重复率高 两种解决方案：线性探查法 分离链接法
    let hash = 0

    for (let i = 0; i < key.length; i++) {
      hash += key[i].charCodeAt()
    }

    return hash % 37
  }

  put(key, value) {
    const node = {  //辅助对象
      key: key,
      value: value
    }
    const position = this.loseloseHashCode(key)

    if (this.items[position]) {  //当前节点若有值 则把新值添加到链表后面 若为空新建链表
      this.items[position].append(node)
    } else {
      this.items[position] = new LinkedList()
      this.items[position].append(node)
    }
  }

  getItem(key) {
    const position = this.loseloseHashCode(key)

    if (this.items[position]) {   //通过链表进行key查询
      let current = this.items[position].head
      while (current) {
        if (current.element.key === key) {
          return current.element
        }
        current = current.next
      }
      return undefined
    }
  }

  remove(key) {
    const position = this.loseloseHashCode(key)

    if (this.items[position]) {
      let current = this.items[position].head
      while (current) {
        if (current.element.key === key) {
          this.items[position].remove(current.element)
          if (this.items[position].isEmpty()) this.items[position] = undefined
          return true
        }
        current = current.next
      }
    }
  }
}
//线性探查法
class HashTable_Liner {
  items = []

  loseloseHashCode(key) {
    let hash = 0

    for (let i = 0; i < key.length; i++) {
      hash += key[i].charCodeAt()
    }

    return hash % 37
  }

  put(key, value) { //若当前节点有值 则往下找到undefined然后赋值
    const position = this.loseloseHashCode(key)
    const node = {
      key: key,
      value: value
    }

    if (this.items[position] === undefined) {
      this.items[position] = node
      return true
    }

    let index = position + 1
    while (this.items[index] !== undefined) {
      index++
    }
    this.items[index] = node
  }

  getItem(key) { //从当前位置往后循环找到相同的key值，然后返回
    const position = this.loseloseHashCode(key)

    for (let i = position; i < this.items.length; i++) {
      if (this.items[i] === undefined) {
        continue
      } else if (this.items[i].key === key) {
        return this.items[i]
      }
    }

    return undefined
  }

  remove(key) {
    const position = this.loseloseHashCode(key)

    for (let i = position; i < this.items.length; i++) {
      if (this.items[i] === undefined) {
        continue
      } else if (this.items[i].key === key) {
        this.items[i] = undefined
        return true
      }
    }

    return false
  }
}
//第二种hash算法
const djb2HashCode = key => {
  let hash = 5381

  for (let i = 0; i < key.length; i++) {
    hash = hahs * 33 + key[i].charCodeAt()
  }

  return hash % 1013
}
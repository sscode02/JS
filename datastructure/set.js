class _Set {
  items = {}

  has(value) {
    return this.items.hasOwnProperty(value)
  }

  add(value) {
    this.items[value] = value
    return true
  }

  remove(value) {
    if (this.items.hasOwnProperty(value)) {
      delete this.items[value]
      return true
    }

    return false
  }

  clear() {
    this.items = {}
  }

  size() {
    return Object.keys(this.items).length
  }

  toString() {
    return Object.keys(this.items).join('->')
  }

  union(otherSet) {
    const resultSet = new _Set()
    const arr = this.values().concat(otherSet.values()) //把两个数组连接成一个再添加 add方法会去重

    for (let i = 0; i < arr.length; i++) {
      resultSet.add(arr[i])
    }

    return resultSet
  }

  intersection(otherSet) {
    const resultSet = new _Set()
    const arr = this.values().concat(otherSet.values())

    for (let i = 0; i < arr.length; i++) {
      if (this.items.hasOwnProperty(arr[i]) && otherSet.items.hasOwnProperty(arr[i])) {
        resultSet.add(arr[i])
      }
    }

    return resultSet
  }

  difference(otherSet) {
    const resultSet = this.values()
    const arr = otherSet.values()

    for (let i = 0; i < arr.length; i++) {
      const index = resultSet.indexOf(arr[i])
      if (index > 0) {
        resultSet.splice(index, 1)
      }
    }

    return resultSet
  }
}


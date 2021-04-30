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
}


class Tree {
  root = null

  insertNode(node, value) { //对插入的数据进行判断
    if (node.value > value) { //如果比当前节点的值小 放左边 要不然放右边 
      if (node.left === null) {
        node.left = new TreeNode(value)
        return true
      }
      this.insertNode(node.left, value)
      return true
    }

    if (node.value < value) {
      if (node.right === null) {
        node.right = new TreeNode(value)
        return true
      }

      this.insertNode(node.right, value)
      return true
    }
  }

  insert(value) {
    if (this.root === null) {  //判断根节点是否为空
      this.root = new TreeNode(value)
      return true
    }

    this.insertNode(this.root, value)
  }

  traverse(node) {
    if (node === null) return
    // console.log(node.value)  //前序遍历
    this.traverse(node.left)
    // console.log(node.value)  //中序遍历
    this.traverse(node.right)
    // console.log(node.value)  //后序遍历
  }

  levelOrder(node) { //借助队列实现层序遍历 
    const queue = []
    queue.push(node)  //根节点入列

    while (queue.length !== 0) {  //队列不为0时一直循环入列
      let front = queue.shift()
      console.log(front.value)
      if (front.left !== null) { //左不为空时入列
        queue.push(front.left)
      }
      if (front.right !== null) { //右不为空时入列
        queue.push(front.right)
      }
    }
  }

  getRoot() {
    return this.root
  }

  removeNode(node, value) {
    if (node === null) return null

    if (node.value > value) {
      //向左查找
      node.left = this.removeNode(node.left, value)
    } else if (node.value < value) {
      //向右查找 
      node.right = this.removeNode(node.right, value)
    } else {
      if (node.left === null) return node.right //左为空时返回右节点
      if (node.right === null) return node.left
      const minNum = this.minNode(node.right) //找到右子树的最小节点
      node.value = minNum.value
      this.removeNode(node.right, minNum.value) //赋值后删除最小节点
    }

    return node
  }

  minNode(node) {
    while (node.left !== null) {
      node = node.left
    }

    return node
  }
}

class TreeNode {  //树的辅助节点
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

const a = new Tree()

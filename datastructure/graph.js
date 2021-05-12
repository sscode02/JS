class Graph {
  vertices = [] //存储顶点
  adjList = {} //顶点对应的边 

  addVertices(vertice) {//添加顶点
    this.vertices.push(vertice)
    this.adjList[vertice] = []
  }

  addAdjList(vertice, brim) { //添加顶点对应的边
    this.adjList[vertice].push(brim)
    this.adjList[brim].push(vertice)
  }

  visiteState() { //顶点探寻状态
    const state = {} //顶点探寻的状态 false为未探寻  初始所有未探寻

    for (let i = 0; i < this.vertices.length; i++) {
      state[this.vertices[i]] = false
    }
    return state
  }

  bfs(vertice) { //广度优先->使用队列
    const queue = []
    const nowState = this.visiteState()
    queue.push(vertice) //当前节点先入队列
    nowState[vertice] = true
    const distance = {} //距离
    const pred = {} //回溯点

    for (let i = 0; i < vertice.length; i++) {
      distance[vertice[i]] = 0
      pred[vertice[i]] = null
    }

    while (queue.length) { //队列不为空时一直遍历
      const now = queue.shift()
      const brim = this.adjList[now]
      for (let i = 0; i < brim.length; i++) { //把当前节点所连接的点入队列 并改变他们的状态
        if (!nowState[brim[i]]) {
          queue.push(brim[i])
          distance[brim[i]] = distance[now] + 1
          pred[brim[i]] = now
          nowState[brim[i]] = true
        }
      }
    }

    return {
      pred,
      distance
    }
  }

  shortPath(from, to) {
    let visited = to
    const stack = []//使用栈存储路径
    const bfs = this.bfs(from)

    while (visited !== from) {
      stack.push(visited) //当前节点入栈
      visited = bfs.pred[visited]
    }

    stack.push(visited)
    stack.reverse()
    console.log(stack.join('->'))
  }

  get() {
    console.log(this.adjList)
  }
  //深度优先算法
  dfsVisite(now, state) {
    state[now] = true //1.改变当前节点状态
    const brim = this.adjList[now]//2.获取当前节点连接的边

    for (let i = 0; i < brim.length; i++) {
      if (!state[brim[i]]) { //如果当前边状态为false 往下递归
        this.dfsVisite(brim[i], state)
      }
    }

    console.log(now)
  }

  dfs(vertice) {
    const state = this.visiteState(vertice)
    this.dfsVisite(vertice, state)
  }
}


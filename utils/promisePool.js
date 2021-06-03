function asyncPool(limit, fn, data) {
  return new Promise((resolve, reject) => {
    const res = []
    const pool = new Set() //并发池
    let i = 0
    let count = 0 //用处判断是否执行完

    function dispose() {
      if (i === data.length) return  //递归出口

      const currentIndex = i++ //数据索引
      const item = data[currentIndex]
      const p = fn(item)

      pool.add(p)

      p.then(value => {
        res[currentIndex] = value
        pool.delete(p)
        count++
        if (count === data.length) {
          resolve(res)
        } else {
          dispose()
        }
      }).catch(reject)

      if (pool.size < limit) {
        dispose()
      }
    }
    dispose()
  })
}
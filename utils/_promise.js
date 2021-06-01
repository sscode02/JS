class FakePromise {
  static PENDING = "pending"
  static FULFILLED = "fulfilled"
  static REJECTED = "rejected"

  constructor(executor) {
    this.state = FakePromise.PENDING
    this.callbacks = []

    const resolve = value => {
      if (this.state !== FakePromise.PENDING) return

      if (value instanceof FakePromise) {
        value.then(value => {
          this.state = FakePromise.FULFILLED  //1.改变状态
          this.value = value    //2.保存value值
          this.callbacks.forEach(({ handleResolve }) => handleResolve()) //3.判断是否为异步操作 把回调函数放到队列中
        })
      } else {
        this.state = FakePromise.FULFILLED  //1.改变状态
        this.value = value    //2.保存value值
        this.callbacks.forEach(({ handleResolve }) => handleResolve()) //3.判断是否为异步操作 把回调函数放到队列中
      }
    }

    const reject = reason => {
      if (this.state !== FakePromise.PENDING) return

      this.state = FakePromise.REJECTED
      this.reason = reason
      this.callbacks.forEach(({ handleRejct }) => handleRejct())
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onResolved, onRejected) {
    const handleRejct = (resolve, reject) => {
      setTimeout(() => {
        try {
          const result = onRejected(this.reason)
          if (result instanceof FakePromise) { //2.如果是promise
            result.then(resolve, reject) // resolve(1)
          } else { //3.不是promsie
            resolve(result) //直接成功
          }
        } catch (error) {
          reject(error)
        }
      })
    }

    const handleResolve = (resolve, reject) => {
      setTimeout(() => {
        try {
          const result = onResolved(this.value)
          if (result instanceof FakePromise) { //2.如果是promise
            result.then(resolve, reject) // resolve(1)
          } else { //3.不是promsie
            resolve(result) //直接成功
          }
        } catch (error) {
          reject(error)
        }
      })
    }

    return new FakePromise((resolve, reject) => {
      if (typeof onResolved !== 'function') {
        onResolved = value => value
      }

      if (typeof onRejected !== 'function') {
        onRejected = reason => reject(reason)
      }

      if (this.state === FakePromise.FULFILLED) {  //执行成功的回调
        handleResolve(resolve, reject)
      }

      if (this.state === FakePromise.REJECTED) { //执行失败的回调
        handleRejct(resolve, reject)
      }

      if (this.state === FakePromise.PENDING) { //当前为pending状态的话,把回调先保存起来
        this.callbacks.push({
          handleResolve: () => handleResolve(resolve, reject),
          handleRejct: () => handleRejct(resolve, reject)
        })
      }
    })
  }

  catch(onReject) {
    return this.then(null, onReject)
  }

  finally(onFinally) {
    return this.then(onFinally, onFinally)
  }

  static resolve(value) {
    return new FakePromise(resolve => resolve(value))
  }

  static reject(reason) {
    return new FakePromise((_, reject) => reject(reason))
  }

  static all(iterable) {
    if (!iterable[Symbol.iterator]) { throw new TypeError(`${typeof iterable} is not iterable`) }

    iterable = Array.from(iterable)
    return new FakePromise((resolve, reject) => {
      const data = []
      let count = 0

      if (iterable.length === 0) resolve([])

      for (let i = 0; i < iterable.length; i++) { //使用索引使值对应
        FakePromise.resolve(iterable[i]).then(
          value => {
            data[i] = value
            count++
            if (count === iterable.length) {
              resolve(data)
            }
          },
          reject
        )
      }
    })
  }

  static allSettled(iterable) {
    if (!iterable[Symbol.iterator]) { throw new TypeError(`${typeof iterable} is not iterable`) }

    iterable = Array.from(iterable)
    return new FakePromise((resolve) => {
      const data = []
      let count = 0

      function resolvePromise() {
        count++
        if (count === iterable.length) {
          resolve(data)
        }
      }

      if (iterable.length === 0) resolve([])

      for (let i = 0; i < iterable.length; i++) {
        FakePromise.resolve(iterable[i]).then(
          value => {
            data[i] = {
              value,
              status: FakePromise.FULFILLED
            }
            resolvePromise()
          },
          reason => {
            data[i] = {
              reason,
              status: FakePromise.REJECTED
            }
            resolvePromise()
          }
        )
      }
    })
  }

  static race(iterable) {
    if (!iterable[Symbol.iterator]) { throw new TypeError(`${typeof iterable} is not iterable`) }

    return new FakePromise((resolve, reject) => {
      Array.from(iterable).forEach(item => FakePromise.resolve(item).then(resolve, reject))
    })
  }
}
function compose(middlewares: Middleware[]) {
  let i = 0
  function dispose() {
    if (i >= middlewares.length) return

    const next = () => { dispose() }
    const fn = middlewares[i]
    i++
    fn(next)
  }
  dispose()
}

type Middleware = (next: any) => void

~function () {
  function middleware1(next) {
    console.log(1)
    next()
    console.log(2)
  }

  function middleware2(next) {
    console.log(3)
    next()
  }
  function middleware3(next) {
    console.log(3)
    next()
  }
  compose([middleware1, middleware2, middleware3]) // 1 3 2
}()
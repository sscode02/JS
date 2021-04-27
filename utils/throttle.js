function throttle(fn, delay) {
  let lastTime = 0
  return function () {
    let now = Date.now()
    if (now - lastTime > delay) {
      fn.call(this, ...args)
      lastTime = now
    }
  }
}
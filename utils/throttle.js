function throttle(fn, delay) {
  let lastTime = 0
  return function (...args) {
    const now = Date.now()
    if (now - lastTime > delay) {
      fn.call(this, ...args)
    }
    lastTime = now
  }
}
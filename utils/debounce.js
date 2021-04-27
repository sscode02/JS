function debounce(fn, delay, immediate) {
  let timer = null
  return function (...args) {
    if (immediate && !timer) {
      fn.call(this, ...args)
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, ...args)
      timer = null
    }, delay)
  }
}
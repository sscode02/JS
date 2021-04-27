class Task {
  constructor() {
    this.tasks = []
    this.isRunning = false // lock
  }

  run(str) {
    this.tasks.push(() => console.log(str))
    this.go()
    return this // chain
  }

  delay(timeout) {
    this.tasks.push(() => new Promise(resolve => setTimeout(resolve, timeout)))
    this.run('delay')
    return this
  }

  async go() {  //queue
    if (this.isRunning) return
    this.isRunning = true

    while (this.tasks.length) {
      const fn = this.tasks.shift()
      await fn()
    }

    this.isRunning = false
  }
}

new Task()
  .run(1)
  .delay(2000)
  .delay(5000)
  .run(2)
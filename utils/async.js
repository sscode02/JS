async function a() {
  console.log('a start')
  await b()
  console.log('a end')
}

async function b() {
  console.log('b')
}

console.log('1')

a()

setTimeout(() => {
  console.log(2)
}, 0);

new Promise(r => {
  console.log(3)
  r()
  console.log(10)
}).then(() => { console.log(4) })
  .finally(() => console.log(20))

console.log(5)

// 1  a start b 3 10 5 a end 4 20  2
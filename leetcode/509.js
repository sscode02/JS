/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  let f1 = 0
  let f2 = 1
  let sum = 1
  if (!n) {
    return n
  }
  for (let i = 1; i < n; i++) {
    sum = f1 + f2
    f1 = f2
    f2 = sum
  }
  return sum
};
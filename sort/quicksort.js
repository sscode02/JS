function quickShort(arr) {
  if (arr.length <= 1) return arr
  let pivot = getMiddle(arr[0], arr[Math.floor(arr.length / 2)], arr[arr.length - 1])  //获取第二大的数
  const left = []  //左边
  const right = [] //右边
  const mid = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else if (arr[i] > pivot) {
      right.push(arr[i])
    } else {
      mid.push(arr[i])
    }
  }

  return quickShort(left).concat(mid, quickShort(right))
}

function getMiddle(a, b, c) { //获取中间数
  if (a < b) {
    if (a > c) {
      return a
    }
    return Math.min(b, c)
  } else {
    if (a < c) {
      return a
    }
    return Math.max(b, c)
  }
}

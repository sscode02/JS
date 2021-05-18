function getRandomArr() {
  const arr = []
  for (let i = 0; i < 10; i++) {
    arr[i] = Math.floor(Math.random() * 100)
  }
  return arr
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr //递归的出口

  let mid = Math.floor(arr.length / 2) // 数组中间的索引
  let left = mergeSort(arr.slice(0, mid)) //往左递归 
  let right = mergeSort(arr.slice(mid, arr.length)) //往右递归

  return merge(left, right) //归并
}

function merge(left, right) {
  let result = [] //辅助数组
  let [leftIndex, rightIndex] = [0, 0] //左右的索引 用于判断越界

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex])
      leftIndex++
    } else {
      result.push(right[rightIndex])
      rightIndex++
    }
  }

  result = result.concat(left.slice(leftIndex, left.length))
  result = result.concat(right.slice(rightIndex, right.length))

  return result
}

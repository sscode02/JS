function bubble(args) {
  const arr = args
  let now = 0

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] < arr[j]) {
        now = arr[i]
        arr[i] = arr[j]
        arr[j] = now
        continue
      }
    }
  }

  return arr
}
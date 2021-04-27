

function add(...nums) {
  function helper(...nums2) {
    return add(...nums, ...nums2)
  }
  helper.sumOf = function () {
    console.log(nums.reduce((prev, cur) => prev + cur))
  }
  return helper
}






add(1).sumOf() // 1
add(1, 2).sumOf() // 3
add(1, 2)(3, 4).sumOf() // 10
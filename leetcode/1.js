/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let obj = {}
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i]
    if (obj[nums[i]] !== undefined) {
      return [obj[nums[i]], i]
    }
    obj[diff] = i
  }
};
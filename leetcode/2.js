/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
/*
1.设置dummy保存头节点 curr指向当前节点
2.判断l1 l2 不为空时 添加到sum
3.判断进位 carry
4.判断sum是否大于10
5.最后的时候判断carry是否为1
*/

var addTwoNumbers = function (l1, l2) {
  const dummy = new ListNode(0)
  let curr = dummy
  let carry = 0

  while (l1 || l2) {
    let sum = 0

    if (l1) {
      sum += l1.val
      l1 = l1.next
    }

    if (l2) {
      sum += l2.val
      l2 = l2.next
    }

    if (carry) {
      sum += 1
      carry = 0
    }

    if (sum >= 10) {
      sum -= 10
      carry = 1
    }

    curr.next = new ListNode(sum)
    curr = curr.next
  }

  if (carry) {
    curr.next = new ListNode(carry)
  }

  return dummy.next
};


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  let dummy = new ListNode()
  let pre = dummy

  while (l1 != null && l2 != null) { //利用归并排序合并的思想
    if (l1.val <= l2.val) {
      pre.next = l1
      pre = pre.next
      l1 = l1.next
    } else {
      pre.next = l2
      pre = pre.next
      l2 = l2.next
    }
  }
  if (l1 != null) {
    pre.next = l1
  }
  if (l2 != null) {
    pre.next = l2
  }
  return dummy.next
};
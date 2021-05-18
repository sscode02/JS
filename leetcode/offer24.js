/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null
  let cur = head
  let next = null

  while (cur) {
    [cur.next, prev, cur] = [prev, cur, cur.next]
  }
  return prev
};
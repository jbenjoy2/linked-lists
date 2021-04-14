/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let node = new Node(val);

    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    if (this.length === 0) this.tail = this.head;
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    // no node in the list at all
    if (!this.length) throw new Error("Linked List is empty...nothing to pop");

    let last = this.head;
    let secondToLast = this.head;

    while (last.next) {
      secondToLast = last;
      last = last.next;
    }
    // remove connection of second to last node to the tail
    secondToLast.next = null;
    // set second to last as new tail
    this.tail = secondToLast;
    // decrease length by one
    this.length -= 1;
    // if it is now empty, set head and tail to null
    if (!this.length) {
      this.head = null;
      this.tail = null;
    }

    return last.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    if (!this.length) throw new Error("List is empty...nothing to remove");

    const remove = this.head;

    this.head = this.head.next;

    this.length -= 1;

    if (!this.length) this.tail = null;
    return remove.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    // if negative index or too-large index return null
    if (idx < 0 || idx >= this.length) throw new Error("Invalid index");

    // start at head and traverse idx times to find node
    let current = this.head;
    // how many nodes have we seen? should stop at idx times
    let numNodes = 0;

    while (numNodes < idx) {
      current = current.next;
      numNodes += 1;
    }

    // return final value
    return current.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    //  implement similarly to get to retrieve current node at index, and then change the val at that node

    // if negative index or too-large index return null
    if (idx < 0 || idx >= this.length) throw new Error("Invalid index");

    // start at head and traverse idx times to find node
    let current = this.head;
    // how many nodes have we seen? should stop at idx times
    let numNodes = 0;

    while (numNodes < idx) {
      current = current.next;
      numNodes += 1;
    }

    // set new value at retrieved node
    current.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx < 0 || idx > this.length) throw new Error("Invalid index");

    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    // get node at index right before insertion point and add new node as its next node, and add its next node as the next for the new node
    let prev = this.head;
    // how many nodes have we seen? should stop at idx times
    let numNodes = 0;

    while (numNodes < idx - 1) {
      prev = prev.next;
      numNodes += 1;
    }

    // create new node
    let node = new Node(val);
    // set new node's next to what is currently at that index
    node.next = prev.next;
    // set the previous node's next to the newly created node
    prev.next = node;
    // increase length by one
    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx < 0 || idx >= this.length) throw new Error("Invalid index");

    // remove first node
    if (idx === 0) {
      // retrieve first node's value to be returned before rearranging list
      let value = this.head.val;
      // set new head
      this.head = this.head.next;
      // decrease length
      this.length -= 1;
      // see if there is now only one item or zero in the list and adjust tail accordingly
      if (this.length < 2) this.tail = this.head;
      return value;
    }

    // retrieve node directly before toBeRemoved
    let prev = this.head;
    // how many nodes have we seen? should stop at idx times
    let numNodes = 0;

    while (numNodes < idx - 1) {
      prev = prev.next;
      numNodes += 1;
    }
    // remove last node
    if (idx === this.length - 1) {
      // get value of tail to be returned
      let value = prev.next.val;
      // disconnect tail from previous
      prev.next = null;
      // set new tail to second to last
      this.tail = prev;
      // decrease length by 1
      this.length -= 1;
      return value;
    }

    // get value of item to be returned
    let value = prev.next.val;
    // disconnect idx from previous and forge new connection to its idx's next node
    prev.next = prev.next.next;
    // decrease length by 1
    this.length -= 1;
    return value;
  }

  /** average(): return an average of all values in the list */

  average() {
    // if list is empty, return zero
    if (!this.length) return 0;
    // keep track of sum of values
    let total = 0;
    // keep track of nodes
    let current = this.head;
    // traverse until no more nodes left
    while (current) {
      // add value to total
      total += current.val;
      // go to next node
      current = current.next;
    }
    // average is sum/number of elements(this.length)
    return total / this.length;
  }
}

module.exports = LinkedList;

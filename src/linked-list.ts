export class LinkedList<T> {
  head?: LinkedListNode<T>;
  tail?: LinkedListNode<T>;
  // O(1)
  insert(value: T) {
    const node = new LinkedListNode(value);
    if (this.tail) {
      this.tail.next = node;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }
    return this;
  }
  // O(n)
  contains(value: T) {
    let ptr: LinkedListNode<T> | undefined = this.head;
    while (ptr && ptr.value !== value) {
      ptr = ptr.next;
    }
    return !!ptr;
  }
  // O(1)
  remove(value: T) {
    if (!this.head) {
      return this;
    }
    if (this.head && this.head.value === value) {
      if (this.head === this.tail) {
        this.head = undefined;
        this.tail = undefined;
      } else {
        this.head.next = undefined;
        this.head = this.head.next;
      }
      return this;
    }
    let ptr: LinkedListNode<T> | undefined = this.head;
    let parent: LinkedListNode<T> | undefined = undefined;
    while (ptr) {
      if (ptr.next && ptr.next.value === value) {
        parent = ptr;
        ptr = ptr.next;
        if (!ptr.next) {
          this.tail = parent;
          parent.next = undefined;
        } else {
          parent.next = ptr.next.next;
          ptr.next = undefined;
        }
        return this;
      } else {
        ptr = ptr.next;
      }
    }
    return this;
  }
  // O(n)
  traverse(cb: TraverseCallback<T>) {
    let ptr = this.head;
    while (ptr) {
      cb(ptr.value);
      ptr = ptr.next;
    }
    return this;
  }
  // O(n)
  reverseTraverse(cb: TraverseCallback<T>) {
    const stack: T[] = [];
    this.traverse(value => stack.push(value));
    while (stack.length) {
      const value = stack.pop()!;
      cb(value);
    }
    return this;
  }
}
class LinkedListNode<T> {
  next?: LinkedListNode<T>;
  constructor(
    public value: T,
  ) {}
}
type TraverseCallback<T> = (value: T) => any;

export class BinarySearchTree<T> {
  value: T;
  parent?: BinarySearchTree<T>;
  left?: BinarySearchTree<T>;
  right?: BinarySearchTree<T>;
  private lessThan: LessThan<T>;
  constructor(value: T, lessThan: LessThan<T> = (a, b) => a < b) {
    this.value = value;
    this.lessThan = lessThan;
  }
  // O(log(n))
  insert(value: T) {
    if (this.lessThan(this.value, value)) {
      if (!this.left) {
        this.left = new BinarySearchTree(value, this.lessThan);
        this.left.parent = this;
      } else {
        this.left.insert(value);
      }
    } else {
      if (!this.right) {
        this.right = new BinarySearchTree(value, this.lessThan);
        this.right.parent = this;
      } else {
        this.right.insert(value);
      }
    }
    return this;
  }
  // O(log(n))
  contains(value: T, parent?: BinarySearchTree<T>): boolean {
    if (this.value === value) {
      return true;
    } else if (this.left && this.lessThan(this.value, value)) {
      return this.left.contains(value);
    } else if (this.right) {
      return this.right.contains(value);
    } else {
      return false;
    }
  }
  // O(log(n))
  remove(value: T) {
    if (this.value === value) {
      if (this.parent) {
        this.parent.left === this
          ? (this.parent.left = undefined)
          : (this.parent.right = undefined);
      } else {
        // TODO: remove root node. (wrap a root node)
      }
    }
  }
}
type LessThan<T> = (a: T, b: T) => boolean;

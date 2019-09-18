export class BinarySearchTree<T> {
  private root?: BinarySearchTreeNode<T>;
  private equal: Equal<T> = (a, b) => a === b;
  constructor(
    private lessThan: LessThan<T> = (a, b) => a < b,
  ) {}
  asRoot(value: T, equalFn: Equal<T> = this.equal): BinarySearchTree<T> {
    const subTree = new BinarySearchTree<T>();
    subTree.root = this.root && this.root.get(value, equalFn);
    return subTree;
  }
  contains(value: T, equalFn: Equal<T> = this.equal) {
    return !!this.root && !!this.root.get(value, equalFn);
  }
  insert(value: T) {
    if (this.root) {
      this.root.insert(value);
    } else {
      this.root = new BinarySearchTreeNode(value, this.lessThan);
    }
    return this;
  }
  traverse(fn: TraverseHandler<T>) {
    if (this.root) {
      this.root.traverse(fn);
    }
    return this;
  }
  remove(value: T) {
    if (this.root) {
      this.root.remove(value);
    }
    return this;
  }
}
class BinarySearchTreeNode<T> {
  left?: BinarySearchTreeNode<T>;
  right?: BinarySearchTreeNode<T>;
  constructor(
    public value: T,
    private lessThan: LessThan<T>
  ) {}
  // O(log(n))
  insert(value: T) {
    if (this.lessThan(value, this.value)) {
      if (this.left) {
        this.left.insert(value);
      } else {
        this.left = new BinarySearchTreeNode(value, this.lessThan);
      }
    } else {
      if (this.right) {
        this.right.insert(value);
      } else {
        this.right = new BinarySearchTreeNode(value, this.lessThan);
      }
    }
  }
  // O(log(n))
  remove(value: T) {
    if (this.value === value) {
      let right = this.right;
      while (right) {
        this.value = right.value
        if (right.right) {
          right.value = right.right.value;
        } else {
          this.right = undefined;
        }
        right = right.right;
      }
    } else if (this.lessThan(value, this.value) && this.left) {
      this.left.remove(value);
    } else if (this.lessThan(this.value, value) && this.right) {
      this.right.remove(value);
    }
  }
  // O(n)
  traverse(fn: TraverseHandler<T>) {
    if (this.left) {
      this.left.traverse(fn);
    }
    fn(this.value);
    if (this.right) {
      this.right.traverse(fn);
    }
  }
  // O(log(n))
  get(value: T, equalFn?: Equal<T>): BinarySearchTreeNode<T> | undefined {
    if (equalFn ? equalFn(this.value, value) : this.value === value) {
      return this;
    } else if (this.lessThan(this.value, value) && this.right) {
      return this.right.get(value);
    } else if (this.lessThan(value, this.value) && this.left) {
      return this.left.get(value);
    }
  }
}
type TraverseHandler<T> = (value: T) => any;
type LessThan<T> = (a: T, b: T) => boolean;
type Equal<T> = LessThan<T>;

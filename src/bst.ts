export class BinarySearchTree<T> {
  private root?: BinarySearchTreeNode<T>;
  constructor(
    private lessThan: LessThan<T> = (a, b) => a < b
  ) {}
  insert(value: T) {
    if (this.root) {
      this.root.insert(value);
    } else {
      this.root = new BinarySearchTreeNode(value, this.lessThan);
    }
    return this;
  }
  traverse(fn: TraverseHandler<T>) {
    
  }
}
class BinarySearchTreeNode<T> {
  left?: BinarySearchTreeNode<T>;
  right?: BinarySearchTreeNode<T>;
  constructor(
    public value: T,
    private lessThan: LessThan<T>
  ) {}
  insert(value: T) {
    if (this.lessThan(this.value, value)) {
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
}
type TraverseHandler<T> = (value: T) => any;
type LessThan<T> = (a: T, b: T) => boolean;

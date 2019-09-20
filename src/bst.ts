export class BinarySearchTree<T> {
  protected root?: BinarySearchTreeNode<T>;
  private equal: Equal<T> = (a, b) => a === b;
  constructor(
    protected lessThan: LessThan<T> = (a, b) => a < b,
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
      if (this.equal(this.root.value, value) && !this.root.left && this.root.right) {
        this.root = undefined;
      } else {
        this.root.remove(value);
      }
    }
    return this;
  }
}
export class BinarySearchTreeNode<T> {
  left?: BinarySearchTreeNode<T>;
  right?: BinarySearchTreeNode<T>;
  constructor(
    public value: T,
    private lessThan: LessThan<T>
  ) {}
  // O(log(n))
  insert(value: T) {
    let newNode: BinarySearchTreeNode<T>;
    if (this.lessThan(value, this.value)) {
      if (this.left) {
        newNode = this.left.insert(value);
      } else {
        newNode = new BinarySearchTreeNode(value, this.lessThan);
        this.left = newNode;
      }
    } else {
      if (this.right) {
        newNode = this.right.insert(value);
      } else {
        newNode = new BinarySearchTreeNode(value, this.lessThan);
        this.right = newNode;
      }
    }
    return newNode;
  }
  // O(log(n))
  remove(value: T, parent?: BinarySearchTreeNode<T>) {
    if (this.value === value) {
      if (!this.left && !this.right && parent) {
        parent.left === this
          ? (parent.left = undefined)
          : (parent.right = undefined)
      } else if (this.left && !this.right) {
        let replaceParent: BinarySearchTreeNode<T> = this;
        // replace: LAST node of right subtree by in-order
        let replace: BinarySearchTreeNode<T> = this.left;
        while (replace.right) {
          replaceParent = replace;
          replace = replace.right;
        }
        this.value = replace.value;
        replace.remove(replace.value, replaceParent);
      } else if (this.right && !this.left) {
        let replaceParent: BinarySearchTreeNode<T> = this;
        // replace: FIRST node of right subtree by in-order
        let replace: BinarySearchTreeNode<T> = this.right;
        while (replace.left) {
          replaceParent = replace;
          replace = replace.left;
        }
        this.value = replace.value;
        replace.remove(replace.value, replaceParent);
      } else if (this.left && this.right) {
        // replace: FIRST node of right subtree by in-order
        let replace: BinarySearchTreeNode<T> = this.right;
        while (replace.left) {
          replace = replace.left;
        }
        this.value = replace.value;
        replace.remove(replace.value, this.right.left ? this.right : this);
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

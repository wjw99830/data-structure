import { BinarySearchTree, BinarySearchTreeNode } from "./bst";

const { min, max } = Math;

export class AVLTree<T> extends BinarySearchTree<T> {
  private balanceFactor = 0;
  insert(value: T) {
    let newNode: BinarySearchTreeNode<T>;
    if (this.root) {
      newNode = this.root.insert(value);
    } else {
      newNode = this.root = new BinarySearchTreeNode(value, this.lessThan);
    }
    this.refreshBalanceFactor();
    if (this.balanceFactor > 1) {
      this.rotation(newNode);
    }
    return this;
  }
  // O(log(n)) to rewrite
  private refreshBalanceFactor() {
    if (!this.root) {
      this.balanceFactor = 0;
      return;
    }
    type LoopItem = {
      node: BinarySearchTreeNode<T>;
      depth: number;
    };
    let minPath = 0;
    let maxPath = 0;
    const queue: LoopItem[] = [{ node: this.root, depth: 0 }];
    while (queue.length) {
      const current = queue.shift()!;
      if (!current.node.left && !current.node.right) {
        minPath = min(minPath, current.depth);
        maxPath = max(maxPath, current.depth);
        continue;
      }
      current.node.left && queue.push({ node: current.node.left, depth: current.depth + 1 });
      current.node.right && queue.push({ node: current.node.right, depth: current.depth + 1 });
    }
    this.balanceFactor = maxPath - minPath;
  }
  private rotation(newNode: BinarySearchTreeNode<T>) {}
}
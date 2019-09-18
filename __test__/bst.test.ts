import { BinarySearchTree } from "../src/bst";

describe('traverse', () => {
  it('should call fn for every node', () => {
    const tree = new BinarySearchTree<number>();
    tree.insert(3).insert(5).insert(1).insert(2);
  });
});

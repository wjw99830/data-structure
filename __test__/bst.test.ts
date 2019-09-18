import { BinarySearchTree } from "../src/bst";

describe('traverse', () => {
  it('should call handler for every node.', () => {
    const tree = new BinarySearchTree<number>();
    tree.insert(3).insert(5).insert(1).insert(2);
    const arr: number[] = [];
    tree.traverse(arr.push.bind(arr));
    expect(arr).toEqual([1, 2, 3, 5]);
  });
});
describe('asRoot', () => {
  it('should return a subtree whose root value is same as passed.', () => {
    const tree = new BinarySearchTree<number>();
    tree.insert(3).insert(5).insert(1).insert(2);
    const subTree = tree.asRoot(1);
    // @ts-ignore
    expect(subTree.root.value).toBe(1);
    // @ts-ignore
    expect(subTree.root.right.value).toBe(2);
    // @ts-ignore
    expect(subTree.root.left).toBe(undefined);
  });
});
describe('contains', () => {
  it('should return if the specified value exists.', () => {
    const tree = new BinarySearchTree<number>();
    tree.insert(3).insert(5).insert(1).insert(2);
    expect(tree.contains(3)).toBe(true);
    expect(tree.contains(1)).toBe(true);
    expect(tree.contains(5)).toBe(true);
    expect(tree.contains(2)).toBe(true);
    expect(tree.contains(4)).toBe(false);
  });
});
describe('remove', () => {
  it('should remove a existing value.', () => {
    const tree = new BinarySearchTree<number>();
    tree.insert(3).insert(5).insert(1).insert(2);
    expect(tree.contains(3)).toBe(true);
    tree.remove(3);
    expect(tree.contains(3)).toBe(false);
  });
});

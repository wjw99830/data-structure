import { LinkedList } from "../src/linked-list";

describe('insert', () => {
  it('should place a new node at the tail of the list.', () => {
    const list = new LinkedList();
    list.insert(5);
    expect(list.contains(5)).toBeTruthy();
  });
});
describe('contains', () => {
  it('should return true if the value is in the linked list.', () => {
    const list = new LinkedList().insert(4).insert(2);
    expect(list.contains(2)).toBe(true);
    expect(list.contains(3)).toBe(false);
  });
});
describe('remove', () => {
  it('should remove the node whose value is equal to the specified', () => {
    const list = new LinkedList();
    list.insert(5);
    expect(list.contains(5)).toBe(true);
    list.remove(5);
    expect(list.contains(5)).toBe(false);
  });
});
describe('traverse', () => {
  it('should call the given function for every node.', () => {
    const list = new LinkedList<number>();
    list.insert(4).insert(2);
    const arr: number[] = [];
    list.traverse(value => arr.push(value));
    expect(arr).toEqual([4, 2]);
  });
});
describe('reverseTraverse', () => {
  it('should call the given function for every node.', () => {
    const list = new LinkedList<number>();
    list.insert(4).insert(2);
    const arr: number[] = [];
    list.reverseTraverse(value => arr.push(value));
    expect(arr).toEqual([2, 4]);
  });
});

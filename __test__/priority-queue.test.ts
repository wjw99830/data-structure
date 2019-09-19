import { PriorityQueue } from "../src/priority-queue";

describe('priority-queue', () => {
  it('should be prioritized.', () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue('first', 3);
    queue.enqueue('second', 1);
    expect(queue.dequeue()).toBe('second');
    expect(queue.dequeue()).toBe('first');
    expect(queue.dequeue()).toBe(undefined);
  });
});

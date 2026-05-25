const assert = require('node:assert/strict');
const test = require('node:test');
const { Todo } = require('../dist/modules/todos/domain/todo.entity');
const {
  InMemoryTodoRepository,
} = require('../dist/modules/todos/repositories/todo.inmemory.repo');

test('creates and lists todos', async () => {
  const repo = new InMemoryTodoRepository();
  const todo = await repo.create(new Todo('1', 'Buy groceries'));

  assert.deepEqual(await repo.findAll(), [todo]);
});

test('does not expose the internal todo array', async () => {
  const repo = new InMemoryTodoRepository();
  await repo.create(new Todo('1', 'Book dentist appointment'));

  const todos = await repo.findAll();
  todos.length = 0;

  assert.equal((await repo.findAll()).length, 1);
});

test('updates an existing todo', async () => {
  const repo = new InMemoryTodoRepository();
  await repo.create(new Todo('1', 'Pay electricity bill'));

  const updated = await repo.update(new Todo('1', 'Pay electricity bill', true));

  assert.deepEqual(updated, new Todo('1', 'Pay electricity bill', true));
});

test('returns null when updating a missing todo', async () => {
  const repo = new InMemoryTodoRepository();

  const updated = await repo.update(new Todo('missing', 'Pick up laundry'));

  assert.equal(updated, null);
});

test('returns whether a todo was deleted', async () => {
  const repo = new InMemoryTodoRepository();
  await repo.create(new Todo('1', 'Call the bank'));

  assert.equal(await repo.delete('1'), true);
  assert.equal(await repo.delete('1'), false);
});

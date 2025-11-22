import { Injectable } from '@nestjs/common';
import { ITodoRepository } from '../domain/todo.repository';
import { Todo } from '../domain/todo.entity';

@Injectable()
export class InMemoryTodoRepository implements ITodoRepository {
  private todos: Todo[] = [];

  async findAll(): Promise<Todo[]> {
    return this.todos;
  }

  async findById(id: string): Promise<Todo | null> {
    return this.todos.find(t => t.id === id) || null;
  }

  async create(todo: Todo): Promise<Todo> {
    this.todos.push(todo);
    return todo;
  }

  async update(todo: Todo): Promise<Todo> {
    const idx = this.todos.findIndex(t => t.id === todo.id);
    this.todos[idx] = todo;
    return todo;
  }

  async delete(id: string): Promise<void> {
    this.todos = this.todos.filter(t => t.id !== id);
  }
}

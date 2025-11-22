import { Todo } from './todo.entity';

export const TODO_REPOSITORY = 'TODO_REPOSITORY';

export interface ITodoRepository {
  findAll(): Promise<Todo[]>;
  findById(id: string): Promise<Todo | null>;
  create(todo: Todo): Promise<Todo>;
  update(todo: Todo): Promise<Todo>;
  delete(id: string): Promise<void>;
}

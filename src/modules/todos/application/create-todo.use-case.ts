import { Inject, Injectable } from '@nestjs/common';
import { Todo } from '../domain/todo.entity';
import { ITodoRepository, TODO_REPOSITORY } from '../domain/todo.repository';

@Injectable()
export class CreateTodoUseCase {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepository: ITodoRepository,
  ) {}

  execute(title: string): Promise<Todo> {
    const todo = new Todo(Date.now().toString(), title);
    return this.todoRepository.create(todo);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Todo } from '../domain/todo.entity';
import { ITodoRepository, TODO_REPOSITORY } from '../domain/todo.repository';

@Injectable()
export class ListTodosUseCase {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepository: ITodoRepository,
  ) {}

  execute(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }
}

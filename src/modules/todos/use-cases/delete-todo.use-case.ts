import { Inject, Injectable } from '@nestjs/common';
import { ITodoRepository, TODO_REPOSITORY } from '../domain/todo.repository';

@Injectable()
export class DeleteTodoUseCase {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepository: ITodoRepository,
  ) {}

  execute(id: string): Promise<boolean> {
    return this.todoRepository.delete(id);
  }
}

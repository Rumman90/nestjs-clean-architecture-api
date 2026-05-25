import { Inject, Injectable } from '@nestjs/common';
import { Todo } from '../domain/todo.entity';
import { ITodoRepository, TODO_REPOSITORY } from '../domain/todo.repository';

type UpdateTodoInput = {
  id: string;
  title?: string;
  completed?: boolean;
};

@Injectable()
export class UpdateTodoUseCase {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepository: ITodoRepository,
  ) {}

  async execute(input: UpdateTodoInput): Promise<Todo | null> {
    const todo = await this.todoRepository.findById(input.id);
    if (!todo) return null;

    if (input.title !== undefined) {
      todo.title = input.title;
    }

    if (input.completed !== undefined) {
      todo.completed = input.completed;
    }

    return this.todoRepository.update(todo);
  }
}

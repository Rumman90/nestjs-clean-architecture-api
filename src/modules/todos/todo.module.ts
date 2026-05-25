import { Module } from '@nestjs/common';
import { TodoController } from './presentation/todo.controller';
import { InMemoryTodoRepository } from './repositories/todo.inmemory.repo';
import { TODO_REPOSITORY } from './domain/todo.repository';
import { CreateTodoUseCase } from './use-cases/create-todo.use-case';
import { DeleteTodoUseCase } from './use-cases/delete-todo.use-case';
import { ListTodosUseCase } from './use-cases/list-todos.use-case';
import { UpdateTodoUseCase } from './use-cases/update-todo.use-case';

@Module({
  controllers: [TodoController],
  providers: [
    CreateTodoUseCase,
    DeleteTodoUseCase,
    ListTodosUseCase,
    UpdateTodoUseCase,
    {
      provide: TODO_REPOSITORY,
      useClass: InMemoryTodoRepository,
    },
  ],
})
export class TodoModule {}

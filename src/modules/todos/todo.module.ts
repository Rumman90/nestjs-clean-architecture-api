import { Module } from '@nestjs/common';
import { TodoController } from './presentation/todo.controller';
import { InMemoryTodoRepository } from './repositories/todo.inmemory.repo';
import { TODO_REPOSITORY } from './domain/todo.repository';
import { CreateTodoUseCase } from './application/create-todo.use-case';
import { DeleteTodoUseCase } from './application/delete-todo.use-case';
import { ListTodosUseCase } from './application/list-todos.use-case';
import { UpdateTodoUseCase } from './application/update-todo.use-case';

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

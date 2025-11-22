import { Module } from '@nestjs/common';
import { TodoController } from './presentation/todo.controller';
import { InMemoryTodoRepository } from './infrastructure/todo.inmemory.repo';
import { TODO_REPOSITORY } from './domain/todo.repository';

@Module({
  controllers: [TodoController],
  providers: [
    {
      provide: TODO_REPOSITORY,
      useClass: InMemoryTodoRepository,
    },
  ],
})
export class TodoModule {}

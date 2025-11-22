import { Module } from '@nestjs/common';
import { TodoModule } from './modules/todos/todo.module';

@Module({
  imports: [TodoModule],
})
export class AppModule {}

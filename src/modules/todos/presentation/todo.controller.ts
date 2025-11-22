import { Controller, Get, Post, Patch, Delete, Body, Param, Inject } from '@nestjs/common';
import { TODO_REPOSITORY, ITodoRepository } from '../domain/todo.repository';
import { Todo } from '../domain/todo.entity';

@Controller('todos')
export class TodoController {
  constructor(
    @Inject(TODO_REPOSITORY)
    private repo: ITodoRepository,
  ) {}

  @Post()
  async create(@Body() body: { title: string }) {
    return this.repo.create(new Todo(Date.now().toString(), body.title));
  }

  @Get()
  async list() {
    return this.repo.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const todo = await this.repo.findById(id);
    if (!todo) return { message: 'Not found' };

    if (body.title) todo.title = body.title;
    if (body.completed !== undefined) todo.completed = body.completed;

    return this.repo.update(todo);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.repo.delete(id);
    return { message: 'Deleted' };
  }
}

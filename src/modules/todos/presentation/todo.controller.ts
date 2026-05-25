import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTodoUseCase } from '../use-cases/create-todo.use-case';
import { DeleteTodoUseCase } from '../use-cases/delete-todo.use-case';
import { ListTodosUseCase } from '../use-cases/list-todos.use-case';
import { UpdateTodoUseCase } from '../use-cases/update-todo.use-case';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(
    private readonly createTodo: CreateTodoUseCase,
    private readonly listTodos: ListTodosUseCase,
    private readonly updateTodo: UpdateTodoUseCase,
    private readonly deleteTodo: DeleteTodoUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a todo' })
  @ApiCreatedResponse({ description: 'Todo created successfully.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  create(@Body() body: CreateTodoDto) {
    return this.createTodo.execute(body.title);
  }

  @Get()
  @ApiOperation({ summary: 'List todos' })
  @ApiOkResponse({ description: 'Todos returned successfully.' })
  list() {
    return this.listTodos.execute();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo' })
  @ApiOkResponse({ description: 'Todo updated successfully.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @ApiNotFoundResponse({ description: 'Todo not found.' })
  async update(@Param('id') id: string, @Body() body: UpdateTodoDto) {
    if (body.title === undefined && body.completed === undefined) {
      throw new BadRequestException('Send at least one field to update.');
    }

    const todo = await this.updateTodo.execute({ id, ...body });
    if (!todo) {
      throw new NotFoundException(`Todo with id "${id}" was not found.`);
    }

    return todo;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiNoContentResponse({ description: 'Todo deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Todo not found.' })
  async remove(@Param('id') id: string) {
    const deleted = await this.deleteTodo.execute(id);
    if (!deleted) {
      throw new NotFoundException(`Todo with id "${id}" was not found.`);
    }
  }
}

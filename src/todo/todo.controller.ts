
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { NewTodoDTO } from './dto/new-todo.dto';
import { UpdatedTodoDto } from './dto/updated-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {

  constructor(private todosService: TodoService) { }

  @Get()
  getTodos() {
    return this.todosService.findAll();
  }

  @Post()
  addTodo(@Body() newTodoBody: NewTodoDTO) {

    if (!newTodoBody.name || !newTodoBody.description) {
      return { "message": "error the name and description shouldn't be empty" }
    }

    return this.todosService.create(newTodoBody)
  }

  @Get(":id")
  getTodo(@Param('id') id: string) {
    return this.todosService.findOne(id) ?? { "message": "not found" };
  }

  @Delete(":id")
  deleteTodo(@Param('id') id: string) {
    return this.todosService.deleteTodo(id);
  }

  @Put(":id")
  updateTodo(@Param("id") id: string, @Body() todoUpdatedData: UpdatedTodoDto) {
    const oldTodo = this.todosService.findOne(id);
    if (!oldTodo)
      return { "message": "todo not found !" };

    this.todosService.updateTodo(id, todoUpdatedData);

    return {
      ...oldTodo,
      todoUpdatedData
    }
  }


}

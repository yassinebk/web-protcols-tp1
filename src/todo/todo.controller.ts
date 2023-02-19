
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { NewTodoDTO } from './dto/new-todo.dto';
import TodoModel, { TodoStatusEnum } from './todo.entity';
import { randomUUID } from "crypto"
import { UpdatedTodoDto } from './dto/updated-todo.dto';

@Controller('todo')
export class TodoController {

  private todos: TodoModel[] = [];

  @Get()
  getTodos() {
    return this.todos;
  }

  @Post()
  addTodo(@Body() newTodoBody: NewTodoDTO) {

    if (!newTodoBody.name || !newTodoBody.description) {
      return { "message": "error the name and description shouldn't be empty" }
    }
    const newTodo = {
      id: randomUUID(),
      creationDate: Date.now(),
      description: newTodoBody.description,
      name: newTodoBody.name,
      state: TodoStatusEnum.waiting
    }

    this.todos.push(newTodo)

    return newTodo
  }

  @Get(":id")
  getTodo(@Param('id') id: string) {
    return this.todos.find(i => i.id === id) ?? { "message": "not found" };
  }

  @Delete(":id")
  deleteTodo(@Param('id') id: string) {

    let lengthBefore = this.todos.length;
    this.todos = this.todos.filter(t => t.id !== id);
    if (lengthBefore > this.todos.length)
      return true;
    return false;
  }

  @Put(":id")
  updateTodo(@Param("id") id: string, @Body() todoUpdatedData: UpdatedTodoDto) {

    const oldTodo = this.todos.find(t => t.id === id);
    if (!oldTodo)
      return { "message": "todo not found !" };

    const updatedTodo = { ...oldTodo, ...todoUpdatedData }

    this.todos = this.todos.map(t => t.id === id ? updatedTodo : t);

    return updatedTodo;
  }


}

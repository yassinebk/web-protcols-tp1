import { Injectable } from "@nestjs/common";
import { CommonService } from "src/common/common.service";
import { NewTodoDTO } from "./dto/new-todo.dto";
import { UpdatedTodoDto } from "./dto/updated-todo.dto";
import TodoModel, { TodoStatusEnum } from "./todo.entity";


@Injectable()
export class TodoService {

  constructor(private commonService: CommonService) { }
  private todos: TodoModel[] = [];

  create(newTodoBody: NewTodoDTO) {
    const newTodo = {
      id: this.commonService.uuid(),
      creationDate: Date.now(),
      description: newTodoBody.description,
      name: newTodoBody.name,
      state: TodoStatusEnum.waiting
    }
    this.todos.push(newTodo);

    return newTodo
  }

  findAll(): TodoModel[] {
    return this.todos;
  }

  findOne(id: string): TodoModel {
    return this.todos.find(i => i.id === id)
  }

  deleteTodo(id: string) {
    let lengthBefore = this.todos.length;
    this.todos = this.todos.filter(t => t.id !== id);
    if (lengthBefore > this.todos.length)
      return true;
    return false;
  }

  updateTodo(id: string, newTodoData: UpdatedTodoDto) {
    this.todos = this.todos.map(t => t.id === id ? { ...t, newTodoData } : t);
    return true;
  }

}

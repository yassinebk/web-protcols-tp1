import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CommonModule } from "../common/common.module"

@Module({
  controllers: [TodoController],
  imports: [CommonModule],
  providers: [TodoService]

})
export class TodoModule { }

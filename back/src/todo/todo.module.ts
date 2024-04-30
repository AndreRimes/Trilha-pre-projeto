import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoService } from './todo.service';
import { TodoRepository } from './repository/todoRepository';

@Module({
    controllers:[TodoController],
    providers: [PrismaService, TodoService, TodoRepository],
    
})
export class TodoModule {}

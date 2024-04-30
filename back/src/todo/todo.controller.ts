import {
    Controller, Post, Get, Body,
    BadRequestException, Param, Delete, Patch, Catch
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    async create(@Body() { title }: { title: string }) {
        if (!title) {
            throw new BadRequestException('Title Cannot be Empty');
        }
        return await this.todoService.createTodo(title);        
    }

    @Get("/:id")
    async get(@Param('id') id: number) {
        try {
            return await this.todoService.getTodo(id);
        } catch (e) {
            throw new BadRequestException(e.message, e.status); 
        }
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        try {
            return await this.todoService.deleteTodo(parseInt(id));
        } catch (e) {
            throw new BadRequestException(e.message, e.status);
        }
    }

    @Patch('/:id')
    async toggle(@Param('id') id: string) {
        try {
            return await this.todoService.toggleTodo(parseInt(id));
        } catch (e) {
            throw new BadRequestException(e.message, e.status); 
        }
    }

    @Patch('/:id/update')
    async updateTitle(@Param('id') id: string, @Body() { title }: { title: string }) {
        try {
            return await this.todoService.updateTodoTitle(parseInt(id), title);
        } catch (e) {
            throw new BadRequestException(e.message, e.status);
        }
    }

    @Get()
    async listAll() {
        try {
            return await this.todoService.listTodos();
        } catch (e) {
            throw new BadRequestException(e.message, e.status);
        }
    }

    @Get('/list/completed')
    async listCompletes(){
        try{
            return await this.todoService.listCompleted()
        }catch(e){
            throw new BadRequestException(e.message, e.status);
        }
    }

    @Get('/list/uncompleted')
    async listUncompleted() {
        try {
            return await this.todoService.listUncompleted();
        } catch (e) {
            throw new BadRequestException(e.message, e.status);
        }
    }

    @Delete('/list/completed')
    async deleteCompleted() {
        try {
            return await this.todoService.deleteCompleted()
        } catch (e) {
            throw new BadRequestException(e.message, e.status);
        }
    }

    @Get('/list/:tagId')
    async listByTagId(@Param('tagId') tagId:string){
        try{
            return await this.todoService.listTodoByTag(parseInt(tagId))
        }catch(e){
            throw new BadRequestException(e.message, e.status);
        }
    }

}

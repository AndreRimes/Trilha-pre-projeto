import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoRepository } from './repository/todoRepository';
import { Todo, Tag } from '@prisma/client';

@Injectable()
export class TodoService {
    constructor(private readonly repository: TodoRepository){} 

    createTodoResponse(todo) {
        return {
            ...todo,
            id: todo?.id?.toString(),
            tags: todo?.tags?.map((t) => {
                return {
                    ...t,
                    id: t.id.toString()
                }
            })
        }
    }

    async createTodo(todoTitle: string) {
        try {
            const todo = await this.repository.createTodo(todoTitle)
            return this.createTodoResponse(todo)
        } catch (e) {
            throw e;
        }
    }

    async getTodo(id: number){
        const todo = await this.repository.getTodo(id)
        if (!todo) {
            throw new NotFoundException('Todo not found');
        }
        return this.createTodoResponse(todo);
    }

    async deleteTodo(id: number){
        try{
            const todo = await this.repository.deleteTodo(id);
            console.log(todo);
            if(!todo){
                throw new NotFoundException('Todo not found');
            }
            return this.createTodoResponse(todo);
        }catch(e){
            throw e;
        }
    }

    async toggleTodo(id: number){
        try {
            let todo = await this.repository.getTodo(id)
            if(!todo){
                throw new NotFoundException('Todo not found');
            }
            todo = await this.repository.toggleTodo(todo)
            return this.createTodoResponse(todo)
        } catch (e) {
            throw e;
        }
    }

    async updateTodoTitle(id: number, newTitle: string) {
        try {
            const todo = await this.repository.updateTodoTitle(id, newTitle);
            return this.createTodoResponse(todo);
        } catch (e) {
            throw e;
        }
    }


    async listTodos(){
        try {
            const todos = await this.repository.listTodos()
            return todos.map((t) => this.createTodoResponse(t))
        } catch (e) {
            throw e;
        }
    } 

    async listCompleted(){
        try{
            const completedTodos = await this.repository.listCompleted()
            return completedTodos.map((t) => this.createTodoResponse(t));
        }catch(e){
            throw e;
        }
    }

    async listUncompleted(){
        try{
            const todos = await this.repository.listUncompleted()
            return todos.map((t) => this.createTodoResponse(t))
        }catch(e){
            throw e;
        }
    }

    async deleteCompleted(){
        try{
            const todos = await this.repository.deleteCompleted()
            return todos
        }catch(e){
            throw e;
        }
    }

    async listTodoByTag(tagId: number) {
        try {
            const todos = await this.repository.listTodoByTag(tagId)
            return todos.map((t) => this.createTodoResponse(t))
        } catch (e) {
            throw e;
        }
    }

    
}

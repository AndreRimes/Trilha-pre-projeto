import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TodoRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createTodo(todoTitle: string) {
        try {
            const todo = await this.prisma.todo.create({
                data: {
                    title: todoTitle,
                    completed: false,
                },
                include: {
                    tags: true
                }
            })
            return todo;
        } catch (e) {
            console.log("ERROR: ", e);
            return e;
        }
    }

    async getTodo(id: number) {
        try {
            const todo = this.prisma.todo.findUnique({
                where: {
                    id,
                },
                include: {
                    tags: true
                }
            })
            return todo;
        } catch (e) {
            return e;
        }
    }

    async deleteTodo(id: number) {
        try {
            const todo = await this.prisma.todo.delete({
                where: {
                    id: id
                }, 
                include: {
                    tags: true
                }
            })
            return todo;
        } catch (e) {
            return e;
        }
    }

    async toggleTodo(todo) {
        try {
            const res = await this.prisma.todo.update({
                where: {
                    id: todo.id
                },
                data: {
                    completed: !todo.completed
                },
                include: {
                    tags: true
                }
            })
            return res
        } catch (e) {
            return e;
        }
    }

    async listTodos() {
        try {
            const todos = await this.prisma.todo.findMany({
                include: {
                    tags: true
                }
            })
            return todos;
        } catch (e) {
            return e;
        }
    }

    async updateTodoTitle(id: number, newTitle: string) {
        try {
            const todo = await this.prisma.todo.update({
                where: {
                    id: id
                },
                data: {
                    title: newTitle
                },
                include: {
                    tags: true,
                }
            });
            return todo;
        } catch (e) {
            return e;
        }
    }


    async listCompleted(){
        try{
            const todos = await this.prisma.todo.findMany({
                where: {
                    completed: true
                },
                include: {
                    tags: true

                }
            })
            return todos;
        }catch(e){
            throw e;
        }
    }


    async listUncompleted() {
        try {
            const todos = await this.prisma.todo.findMany({
                where: {
                    completed: false
                },
                include: {
                    tags: true

                }
            })
            return todos
        } catch (e) {
            throw e;
        }
    }

    async deleteCompleted(){
        try{
            const todos = await this.prisma.todo.deleteMany({
                where: {
                    completed : true,
                },
            })
            return todos;
        }catch(e){
            throw e;
        }
    }

    async listTodoByTag(tagId: number){
        try{
            const tag = await this.prisma.tag.findUnique({
                where: { id: tagId },
                include: { todos: true }
            });

            if (!tag) {
                throw new Error('Tag not found');
            }

            return tag.todos;
        }catch(e){
            throw e;
        }
    }
}

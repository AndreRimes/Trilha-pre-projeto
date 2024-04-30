import { Injectable } from "@nestjs/common";
import { Tag, Todo } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TagRepository {
    constructor(private readonly prisma: PrismaService){}

    async createTag(tagTitle: string) {
        try {
            const tag = await this.prisma.tag.create({
                data: {
                    title: tagTitle,
                },
                include: {
                    todos: true,
                }
            });
            return tag;
        } catch (e) {
            console.log("ERROR: ", e);
            return e;
        }
    }

    async getTag(id: number) {
        try {
            const tag = await this.prisma.tag.findUnique({
                where: {
                    id,
                },
                include: {
                    todos: true
                }
            });
            return tag;
        } catch (e) {
            return e;
        }
    }

    async listTags(){
        try {
            const tags = await this.prisma.tag.findMany({
                include: {
                    todos: true
                }
            })
            return tags;
        } catch (e) {
            throw e;
        }
    }

    async updateTagTitle(id: number, newTitle: string) {
        try {
            const tag = await this.prisma.tag.update({
                where: {
                    id: id
                },
                data: {
                    title: newTitle
                },
                include : {
                    todos: true
                }
            });
            return tag;
        } catch (e) {
            return e;
        }
    }


    async deleteTag(id: number) {
        try {
            const tag = await this.prisma.tag.delete({
                where: {
                    id: id
                },
                include: {
                    todos: true
                }
            });
            return tag;
        } catch (e) {
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

      async addTodoToTag(tag: Tag, todo: Todo) {
        try {
            const updatedTag = await this.prisma.tag.update({
                where: {
                    id: tag.id
                },
                data: {
                    todos: {
                        connect: [{ id: todo.id }]
                    }
                },
                include: {
                    todos: true,
                }
            });
            return updatedTag;
        } catch (e) {
            console.log("ERROR: ", e);
            return e;
        }
    }

    async removeTodoFromTag(tag: Tag, todo: Todo) {
        try {
            const updatedTag = await this.prisma.tag.update({
                where: {
                    id: tag.id
                },
                data: {
                    todos: {
                        disconnect: [{ id: todo.id }]
                    }
                },
                include: {
                    todos: true,
                }
            });
            return updatedTag;
        } catch (e) {
            console.log("ERROR: ", e);
            return e;
        }
    }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { TagRepository } from './repository/tagRepository';

@Injectable()
export class TagService {
    constructor(private readonly repository: TagRepository){} 

    createTagResponse(tag){
        return {
            ...tag,
            id: tag.id.toString(),
            todos: tag.todos ? tag.todos.map((t) => {
                return {
                    ...t,
                    id: t.id.toString(),
                }
            }) : []
        }
    }

    async createTag(tagTitle: string) {
        try {
            const tag = await this.repository.createTag(tagTitle); 
            return this.createTagResponse(tag);
        } catch (e) {
            throw e;
        }
    }

    async getTag(id: number){
        const tag = await this.repository.getTag(id);
        if (!tag) {
            throw new NotFoundException('Tag not found');
        }
        return this.createTagResponse(tag)
    }

    async listTags(){
        try{
            const tags = await this.repository.listTags()
            return tags.map((t) => this.createTagResponse(t))
        }catch(e){
            throw e;
        }
    }

    async updateTagTitle(id: number, newTitle: string) {
        try {
            const tag = await this.repository.updateTagTitle(id, newTitle);
            return this.createTagResponse(tag);
        } catch (e) {
            throw e;
        }
    }

    async deleteTag(id: number){
        try{
            const tag = await this.repository.deleteTag(id);
            if(!tag){
                throw new NotFoundException('Tag not found');
            }
            return this.createTagResponse(tag)
        }catch(e){
            throw e;
        }
    }

    async addTodoToTag(tagId: number, todoId: number) {
        try {
            const tag = await this.repository.getTag(tagId);
            const todo = await this.repository.getTodo(todoId);
            const updatedTag = await this.repository.addTodoToTag(tag, todo);
            return this.createTagResponse(updatedTag);
        } catch (e) {
            throw e;
        }
    }

    async removeTodoFromTag(tagId: number, todoId: number) {
        try {
            const tag = await this.repository.getTag(tagId);
            const todo = await this.repository.getTodo(todoId);
            const updatedTag = await this.repository.removeTodoFromTag(tag, todo);
            return this.createTagResponse(updatedTag);
        } catch (e) {
            throw e;
        }
    }

}
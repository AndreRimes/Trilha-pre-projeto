import {
    Controller, Post, Get, Body,
    BadRequestException, Param, Delete, Patch
} from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Post()
    async create(@Body() { title}: { title: string}) {
        if (!title) {
            throw new BadRequestException('Title Cannot be Empty');
        }
        try{
            return await this.tagService.createTag(title);        
        }catch(e){
            throw new BadRequestException(e.message, e.status); 
        }
    }

    @Get("/:id")
    async get(@Param('id') id: string) {
        try {
            return await this.tagService.getTag(parseInt(id));
        } catch (e) {
            throw new BadRequestException(e.message, e.status); 
        }
    }
    
    @Get()
    async list(){
        try{
            return await this.tagService.listTags()
        }catch(e){
            throw new BadRequestException(e.message, e.status); 
        }
    }

    @Patch('/:id/update')
    async updateTitle(@Param('id') id: string, @Body() { title }: { title: string }) {
        try {
            return await this.tagService.updateTagTitle(parseInt(id), title);
        } catch (e) {
            throw new BadRequestException(e.message, e.status);
        }
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        try {
            return await this.tagService.deleteTag(parseInt(id));
        } catch (e) {
            throw new BadRequestException(e.message, e.status);
        }
    }


    @Post('/:tagId/add-todo/:todoId')
    async addTodoToTag(
        @Param('tagId') tagId: string,
        @Param('todoId') todoId: string
    ) {
        try {
            return await this.tagService.addTodoToTag(parseInt(tagId), parseInt(todoId));
        } catch (e) {
            throw new BadRequestException(e.message, e.status);
        }
    }

    @Post('/:tagId/remove-todo/:todoId')
    async removeTodoFromTag(
        @Param('tagId') tagId: string,
        @Param('todoId') todoId: string
    ) {
        try {
            return await this.tagService.removeTodoFromTag(parseInt(tagId), parseInt(todoId));
        } catch (e) {
            throw new BadRequestException(e.message, e.status);
        }
    }
}

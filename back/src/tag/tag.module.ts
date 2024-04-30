import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TagRepository } from './repository/tagRepository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers:[TagController],
    providers: [PrismaService, TagService, TagRepository],
})
export class TagModule {}

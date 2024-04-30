import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { PrismaService } from './prisma/prisma.service';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [TodoModule, TagModule],
  providers: [PrismaService],
})
export class AppModule {}

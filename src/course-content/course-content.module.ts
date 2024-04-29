import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CourseContentController } from './course-content.controller';
import { courseContentProviders } from './course-content.providers';
import { CourseContentService } from './course-content.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CourseContentController],
  providers: [CourseContentService, ...courseContentProviders],
})
export class CourseContentModule {}

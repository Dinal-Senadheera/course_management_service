import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CoursesController } from './courses.controller';
import { coursesProviders } from './courses.providers';
import { CoursesService } from './courses.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CoursesController],
  providers: [CoursesService, ...coursesProviders],
})
export class CoursesModule {}

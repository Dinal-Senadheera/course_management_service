import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseContentModule } from './course-content/course-content.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [ConfigModule.forRoot(), CoursesModule, CourseContentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

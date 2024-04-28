import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCourseContentDto } from './dto/create-course-content.dto';
import { UpdateCourseContentDto } from './dto/update-course-content.dto';
import { CourseContent } from './interfaces/course-content.interface';

@Injectable()
export class CourseContentService {
  constructor(
    @Inject('COURSE_CONTENT_MODEL')
    private courseContentModel: Model<CourseContent>,
  ) {}

  create(createCourseContentDto: CreateCourseContentDto) {
    const queriedCourse = this.courseContentModel.findOne({
      courseId: createCourseContentDto.courseId,
    });

    for (const content of createCourseContentDto.content) {
      if (queriedCourse && queriedCourse.step - content.step > 1) {
        throw new HttpException(
          `Course content with step: '${content.step}' already exists`,
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  findAll() {
    return `This action returns all courseContent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseContent`;
  }

  update(id: number, updateCourseContentDto: UpdateCourseContentDto) {
    return `This action updates a #${id} courseContent`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseContent`;
  }
}

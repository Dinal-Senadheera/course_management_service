import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './interfaces/course.interface';

@Injectable()
export class CoursesService {
  constructor(@Inject('COURSES_MODEL') private courseModel: Model<Course>) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const createdCourse = this.courseModel.create(createCourseDto);
    return createdCourse;
  }

  async findAll(): Promise<Course[]> {
    const courses = this.courseModel.find();
    return courses;
  }

  findOne(id: string): Promise<Course> {
    const course = this.courseModel.findOne({ courseId: id });
    return course;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    const updatedCourse = this.courseModel.findOneAndUpdate(
      { courseId: id },
      {
        $set: updateCourseDto,
      },
      { new: true },
    );
    return updatedCourse;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}

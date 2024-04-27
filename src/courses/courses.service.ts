import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './interfaces/course.interface';

@Injectable()
export class CoursesService {
  constructor(@Inject('COURSES_MODEL') private courseModel: Model<Course>) {
    mongoose.set('debug', true);
  }

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const queriedCourse = await this.courseModel.findOne({
      courseId: createCourseDto.courseId,
    });

    if (queriedCourse) {
      throw new HttpException(
        `Course with course ID: '${createCourseDto.courseId}' already exists`,
        HttpStatus.CONFLICT,
      );
    }

    const createdCourse = await this.courseModel.create({
      courseId: createCourseDto.courseId,
      name: createCourseDto.name,
      description: createCourseDto.description,
      price: createCourseDto.price,
    });
    return createdCourse;
  }

  async findAll(): Promise<Course[]> {
    const courses = await this.courseModel.find();
    if (!courses) {
      throw new HttpException('No courses found', HttpStatus.NOT_FOUND);
    }
    return courses;
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel.findOne({ courseId: id });
    if (!course) {
      throw new HttpException(
        `Course with course ID: '${id}' was not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const queriedCourse = await this.courseModel.findOne({ courseId: id });

    if (!queriedCourse) {
      throw new HttpException(
        `Course with course ID: '${id}' was not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedCourse = await this.courseModel.findOneAndUpdate(
      { courseId: id },
      {
        name: updateCourseDto.name || queriedCourse.name,
        description: updateCourseDto.description || queriedCourse.description,
        price: updateCourseDto.price || queriedCourse.price,
      },
      { new: true },
    );

    return updatedCourse;
  }

  async remove(id: string) {
    const deletedCourse = await this.courseModel.findOneAndDelete({
      courseId: id,
    });
    if (!deletedCourse) {
      throw new HttpException(
        `Course with course ID: '${id}' was not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return deletedCourse;
  }
}

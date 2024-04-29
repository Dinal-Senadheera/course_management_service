import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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

  async create(createCourseContentDto: CreateCourseContentDto) {
    const queriedCourseContent = await this.courseContentModel.findOne({
      courseId: createCourseContentDto.courseId,
      step: createCourseContentDto.step,
    });

    if (queriedCourseContent) {
      throw new HttpException(
        `Course content with course ID: '${createCourseContentDto.courseId}' and step: '${createCourseContentDto.step}' already exists`,
        HttpStatus.CONFLICT,
      );
    }

    const createdCourseContent = await this.courseContentModel.create({
      courseId: createCourseContentDto.courseId,
      step: createCourseContentDto.step,
      content: createCourseContentDto.content,
    });

    return createdCourseContent;
  }

  async findAll() {
    const courseContents = await this.courseContentModel.find({
      isApproved: true,
    });
    if (!courseContents.length) {
      throw new HttpException('No course content found', HttpStatus.NOT_FOUND);
    }
    return courseContents;
  }

  async adminFindAll() {
    const courseContents = await this.courseContentModel.find();
    if (!courseContents.length) {
      throw new HttpException('No course content found', HttpStatus.NOT_FOUND);
    }
    return courseContents;
  }

  async findOne(id: string, step?: number) {
    const courseContent = await this.courseContentModel
      .find({
        courseId: id,
        ...(step && { step: step }),
      })
      .sort({ step: 1 });

    if (!courseContent.length) {
      throw new HttpException(
        `Course content with course ID: '${id}' ${
          step ? `and step: '${step}'` : ''
        } was not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return courseContent;
  }

  async update(
    id: string,
    step: number,
    updateCourseContentDto: UpdateCourseContentDto,
  ) {
    const queriedCourseContent = await this.courseContentModel.findOne({
      courseId: id,
      step: step,
    });

    if (!queriedCourseContent) {
      throw new HttpException(
        `Course content with course ID: '${id}' and step: '${step}' was not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const queriedCourseContentStep = await this.courseContentModel.findOne({
      courseId: id,
      step: updateCourseContentDto.step,
    });

    if (queriedCourseContentStep) {
      throw new HttpException(
        `Course content with course ID: '${id}' and the payload step: '${updateCourseContentDto.step}' already exists`,
        HttpStatus.CONFLICT,
      );
    }

    const updatedCourseContent = await this.courseContentModel.findOneAndUpdate(
      { courseId: id, step: step },
      {
        step: updateCourseContentDto.step,
        content: updateCourseContentDto.content,
        isApproved: false,
      },
      { new: true },
    );

    return updatedCourseContent;
  }

  async remove(id: string, step?: number) {
    const courseContent = await this.courseContentModel.findOneAndDelete({
      courseId: id,
      ...(step && { step: step }),
    });

    if (!courseContent) {
      throw new HttpException(
        `Course content with course ID: '${id}' ${
          step ? `and step: '${step}'` : ''
        } was not found
        `,
        HttpStatus.NOT_FOUND,
      );
    }

    return courseContent;
  }

  async approve(id: string, step: number) {
    const courseContent = await this.courseContentModel.findOneAndUpdate(
      { courseId: id, step: step },
      { isApproved: true },
      { new: true },
    );

    if (!courseContent) {
      throw new HttpException(
        `Course content with course ID: '${id}' and step: '${step}' was not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return courseContent;
  }

  async reject(id: string, step: number) {
    const courseContent = await this.courseContentModel.findOneAndUpdate(
      { courseId: id, step: step },
      { isApproved: false },
      { new: true },
    );

    if (!courseContent) {
      throw new HttpException(
        `Course content with course ID: '${id}' and step: '${step}' was not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return courseContent;
  }

  // validateStep = async (
  //   courseId: string,
  //   step: number,
  //   checkEquality: boolean,
  // ) => {
  //   const queriedCourse = await this.courseContentModel
  //     .find({
  //       courseId: courseId,
  //     })
  //     .sort({ step: -1 });

  //   if (queriedCourse.length > 0) {
  //     if (queriedCourse[0].step - step > 1) {
  //       throw new HttpException(
  //         `Course content must be added in order. The next step should be: ${
  //           queriedCourse[0].step + 1
  //         }`,
  //         HttpStatus.FAILED_DEPENDENCY,
  //       );
  //     } else if (
  //       queriedCourse[0].step - step < 1 &&
  //       queriedCourse[0].step - step > 0.1
  //     ) {
  //       throw new HttpException(
  //         `Course content must be added in order. The next step should be: ${
  //           queriedCourse[0].step + 0.1
  //         }`,
  //         HttpStatus.FAILED_DEPENDENCY,
  //       );
  //     } else if (checkEquality && queriedCourse[0].step === step) {
  //       throw new HttpException(
  //         `Course content with step: ${step} already exists for course ID: ${courseId}`,
  //         HttpStatus.CONFLICT,
  //       );
  //     }
  //   }
  // };
}

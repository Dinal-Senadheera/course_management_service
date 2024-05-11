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
      contentType: createCourseContentDto.contentType,
    });

    if (queriedCourseContent) {
      throw new HttpException(
        `Course content with course ID: '${createCourseContentDto.courseId}' and step: '${createCourseContentDto.step}' already exists for content type: '${createCourseContentDto.contentType}'`,
        HttpStatus.CONFLICT,
      );
    }

    const createdCourseContent = await this.courseContentModel.create({
      courseId: createCourseContentDto.courseId,
      step: createCourseContentDto.step,
      content: createCourseContentDto.content,
      contentType: createCourseContentDto.contentType,
    });

    return createdCourseContent;
  }

  async findAll() {
    const courseContents = await this.courseContentModel.find({});
    if (!courseContents.length) {
      throw new HttpException('No course content found', HttpStatus.NOT_FOUND);
    }
    return courseContents;
  }

  async adminFindAll() {
    const courseContents = await this.courseContentModel.find({
      isApproved: false,
      wasEvaluated: false,
    });
    if (!courseContents.length) {
      throw new HttpException(
        'No course content found to be approved or rejected',
        HttpStatus.NOT_FOUND,
      );
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
    contentType: string,
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

    const updatedCourseContent = await this.courseContentModel.findOneAndUpdate(
      { courseId: id, step: step, contentType: contentType },
      {
        step: updateCourseContentDto.step,
        content: updateCourseContentDto.content,
        contentType: updateCourseContentDto.contentType,
        isApproved: false,
        wasEvaluated: false,
      },
      { new: true },
    );

    return updatedCourseContent;
  }

  async remove(id: string, step?: number, contentType?: string) {
    const courseContent = await this.courseContentModel.findOneAndDelete({
      courseId: id,
      ...(step && { step: step }),
      ...(contentType && { contentType: contentType }),
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
      { isApproved: true, wasEvaluated: true },
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
      { isApproved: false, wasEvaluated: true },
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

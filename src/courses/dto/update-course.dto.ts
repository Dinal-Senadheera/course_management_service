import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  readonly courseId: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
}

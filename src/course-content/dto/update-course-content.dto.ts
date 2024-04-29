import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseContentDto } from './create-course-content.dto';

export class UpdateCourseContentDto extends PartialType(
  CreateCourseContentDto,
) {
  readonly isApproved: boolean;
}

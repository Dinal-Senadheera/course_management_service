export class CreateCourseContentDto {
  readonly courseId: string;
  readonly step: number;
  readonly content: string;
  readonly contentType: string;
}

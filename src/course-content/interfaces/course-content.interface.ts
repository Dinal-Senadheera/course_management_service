import { Document } from 'mongoose';

export interface CourseContent extends Document {
  readonly courseId: string;
  readonly step: number;
  readonly content: string;
}

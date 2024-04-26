import { Document } from 'mongoose';

export interface Course extends Document {
  readonly courseId: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
}

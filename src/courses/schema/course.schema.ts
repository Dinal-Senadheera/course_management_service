import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Course {
  @Prop({ required: true, unique: true })
  courseId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  price: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

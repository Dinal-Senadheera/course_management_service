import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class CourseContent {
  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true })
  step: number;

  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  isApproved: boolean;
}

export default SchemaFactory.createForClass(CourseContent);

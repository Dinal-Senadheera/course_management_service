import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class CourseContent {
  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true })
  step: number;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  contentType: string;

  @Prop({ default: false })
  isApproved: boolean;

  @Prop({ default: false })
  wasEvaluated: boolean;
}

export default SchemaFactory.createForClass(CourseContent);

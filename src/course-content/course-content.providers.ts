import { Mongoose } from 'mongoose';
import CourseContentSchema from './schema/course-content.schema';

export const courseContentProviders = [
  {
    provide: 'COURSE_CONTENT_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('CourseContent', CourseContentSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

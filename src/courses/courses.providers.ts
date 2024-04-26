import { Mongoose } from 'mongoose';
import { CourseSchema } from './schema/course.schema';

export const coursesProviders = [
  {
    provide: 'COURSES_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Course', CourseSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

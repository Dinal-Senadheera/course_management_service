import { Test, TestingModule } from '@nestjs/testing';
import { CourseContentController } from './course-content.controller';
import { CourseContentService } from './course-content.service';

describe('CourseContentController', () => {
  let controller: CourseContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseContentController],
      providers: [CourseContentService],
    }).compile();

    controller = module.get<CourseContentController>(CourseContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

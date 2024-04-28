import { Test, TestingModule } from '@nestjs/testing';
import { CourseContentService } from './course-content.service';

describe('CourseContentService', () => {
  let service: CourseContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseContentService],
    }).compile();

    service = module.get<CourseContentService>(CourseContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

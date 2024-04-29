import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CourseContentService } from './course-content.service';
import { CreateCourseContentDto } from './dto/create-course-content.dto';
import { UpdateCourseContentDto } from './dto/update-course-content.dto';

@Controller('course-content')
export class CourseContentController {
  constructor(private readonly courseContentService: CourseContentService) {}

  @Post()
  create(@Body() createCourseContentDto: CreateCourseContentDto) {
    return this.courseContentService.create(createCourseContentDto);
  }

  @Get()
  findAll() {
    return this.courseContentService.findAll();
  }

  @Get('admin')
  adminFindAll() {
    return this.courseContentService.adminFindAll();
  }

  @Get(':id?')
  findOne(@Param('id') id: string, @Query('step') step: string) {
    return this.courseContentService.findOne(id, +step);
  }

  @Patch(':id/:step')
  update(
    @Param('id') id: string,
    @Param('step') step: string,
    @Body() updateCourseContentDto: UpdateCourseContentDto,
  ) {
    return this.courseContentService.update(id, +step, updateCourseContentDto);
  }

  @Patch('approve/:id/:step')
  approve(@Param('id') id: string, @Param('step') step: string) {
    return this.courseContentService.approve(id, +step);
  }

  @Patch('reject/:id/:step')
  reject(@Param('id') id: string, @Param('step') step: string) {
    return this.courseContentService.reject(id, +step);
  }

  @Delete('/:id/:step')
  remove(@Param('id') id: string, @Param('step') step?: string) {
    return this.courseContentService.remove(id, +step);
  }
}

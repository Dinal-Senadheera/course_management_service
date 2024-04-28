import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseContentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseContentDto: UpdateCourseContentDto) {
    return this.courseContentService.update(+id, updateCourseContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseContentService.remove(+id);
  }
}

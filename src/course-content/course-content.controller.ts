import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CourseContentService } from './course-content.service';
import { CreateCourseContentDto } from './dto/create-course-content.dto';
import { UpdateCourseContentDto } from './dto/update-course-content.dto';
import { RolesGuard } from '../auth/roles.guard';

@Controller('course-content')
export class CourseContentController {
  constructor(private readonly courseContentService: CourseContentService) {}

  // INSTRUCTOR can add course content
  @Post()
  @UseGuards(new RolesGuard(['INSTRUCTOR']))
  create(@Body() createCourseContentDto: CreateCourseContentDto) {
    return this.courseContentService.create(createCourseContentDto);
  }

  // USER, INSTRUCTOR, ADMIN can view content
  @Get()
  @UseGuards(new RolesGuard(['USER', 'INSTRUCTOR', 'ADMIN']))
  findAll() {
    return this.courseContentService.findAll();
  }

  @Get(':id?')
  @UseGuards(new RolesGuard(['USER', 'INSTRUCTOR', 'ADMIN']))
  findOne(@Param('id') id: string, @Query('step') step: string) {
    return this.courseContentService.findOne(id, +step);
  }

  // INSTRUCTOR can update content
  @Patch(':id/:step?')
  @UseGuards(new RolesGuard(['INSTRUCTOR']))
  update(
    @Param('id') id: string,
    @Param('step') step: string,
    @Query('contentType') contentType: string,
    @Body() updateCourseContentDto: UpdateCourseContentDto,
  ) {
    return this.courseContentService.update(
      id,
      +step,
      contentType,
      updateCourseContentDto,
    );
  }

  // ADMIN can approve content
  @Patch('approve/:id/:step')
  @UseGuards(new RolesGuard(['ADMIN']))
  approve(@Param('id') id: string, @Param('step') step: string) {
    return this.courseContentService.approve(id, +step);
  }

  // ADMIN can reject content
  @Patch('reject/:id/:step?')
  @UseGuards(new RolesGuard(['ADMIN']))
  reject(@Param('id') id: string, @Param('step') step: string) {
    return this.courseContentService.reject(id, +step);
  }

  // INSTRUCTOR can delete course content
  @Delete('/:id/:step?')
  @UseGuards(new RolesGuard(['INSTRUCTOR']))
  remove(
    @Param('id') id: string,
    @Param('step') step?: string,
    @Query('contentType') contentType?: string,
  ) {
    return this.courseContentService.remove(id, +step, contentType);
  }
}

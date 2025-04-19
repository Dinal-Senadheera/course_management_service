import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { RolesGuard } from '../auth/roles.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Only ADMIN can create a course
  @Post()
  @UseGuards(new RolesGuard(['ADMIN']))
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  // USER, INSTRUCTOR, and ADMIN can fetch all courses
  @Get()
  @UseGuards(new RolesGuard(['USER', 'INSTRUCTOR', 'ADMIN']))
  findAll() {
    return this.coursesService.findAll();
  }

  // USER, INSTRUCTOR, and ADMIN can fetch a course by ID
  @Get(':id')
  @UseGuards(new RolesGuard(['USER', 'INSTRUCTOR', 'ADMIN']))
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  // Only ADMIN can update a course
  @Patch(':id')
  @UseGuards(new RolesGuard(['ADMIN']))
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  // Only ADMIN can delete a course
  @Delete(':id')
  @UseGuards(new RolesGuard(['ADMIN']))
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}

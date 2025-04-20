import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  private readonly logger = new Logger(CoursesController.name);

  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(new RolesGuard(['ADMIN']))
  create(@Body() createCourseDto: CreateCourseDto) {
    this.logger.debug(
      `Admin creating new course: ${createCourseDto.name || 'Untitled'}`,
    );
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @UseGuards(new RolesGuard(['USER', 'INSTRUCTOR', 'ADMIN']))
  findAll() {
    this.logger.debug('Retrieving all courses');
    return this.coursesService.findAll();
  }

  @Get(':id')
  @UseGuards(new RolesGuard(['USER', 'INSTRUCTOR', 'ADMIN']))
  findOne(@Param('id') id: string) {
    this.logger.debug(`Retrieving course with ID: ${id}`);
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(new RolesGuard(['ADMIN']))
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    this.logger.debug(`Admin updating course with ID: ${id}`);
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(new RolesGuard(['ADMIN']))
  remove(@Param('id') id: string) {
    this.logger.debug(`Admin deleting course with ID: ${id}`);
    return this.coursesService.remove(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { CourseContentService } from './course-content.service';
import { CreateCourseContentDto } from './dto/create-course-content.dto';
import { UpdateCourseContentDto } from './dto/update-course-content.dto';

@Controller('course-content')
export class CourseContentController {
  private readonly logger = new Logger(CourseContentController.name);

  constructor(private readonly courseContentService: CourseContentService) {}

  @Post()
  @UseGuards(new RolesGuard(['INSTRUCTOR']))
  create(@Body() createCourseContentDto: CreateCourseContentDto) {
    this.logger.debug(
      `Creating new course content for course ID: ${createCourseContentDto.courseId}`,
    );
    return this.courseContentService.create(createCourseContentDto);
  }

  @Get()
  @UseGuards(new RolesGuard(['USER', 'INSTRUCTOR', 'ADMIN']))
  findAll() {
    this.logger.debug('Retrieving all course content');
    return this.courseContentService.findAll();
  }

  @Get(':id?')
  @UseGuards(new RolesGuard(['USER', 'INSTRUCTOR', 'ADMIN']))
  findOne(@Param('id') id: string, @Query('step') step: string) {
    this.logger.debug(
      `Retrieving course content for ID: ${id}, step: ${step || 'all'}`,
    );
    return this.courseContentService.findOne(id, +step);
  }

  @Patch(':id/:step?')
  @UseGuards(new RolesGuard(['INSTRUCTOR']))
  update(
    @Param('id') id: string,
    @Param('step') step: string,
    @Query('contentType') contentType: string,
    @Body() updateCourseContentDto: UpdateCourseContentDto,
  ) {
    this.logger.debug(
      `Updating course content for ID: ${id}, step: ${
        step || 'all'
      }, contentType: ${contentType || 'default'}`,
    );
    return this.courseContentService.update(
      id,
      +step,
      contentType,
      updateCourseContentDto,
    );
  }

  @Patch('approve/:id/:step')
  @UseGuards(new RolesGuard(['ADMIN']))
  approve(@Param('id') id: string, @Param('step') step: string) {
    this.logger.debug(
      `Admin approving course content for ID: ${id}, step: ${step}`,
    );
    return this.courseContentService.approve(id, +step);
  }

  @Patch('reject/:id/:step?')
  @UseGuards(new RolesGuard(['ADMIN']))
  reject(@Param('id') id: string, @Param('step') step: string) {
    this.logger.debug(
      `Admin rejecting course content for ID: ${id}, step: ${step || 'all'}`,
    );
    return this.courseContentService.reject(id, +step);
  }

  @Delete('/:id/:step?')
  @UseGuards(new RolesGuard(['INSTRUCTOR']))
  remove(
    @Param('id') id: string,
    @Param('step') step?: string,
    @Query('contentType') contentType?: string,
  ) {
    this.logger.debug(
      `Deleting course content for ID: ${id}, step: ${
        step || 'all'
      }, contentType: ${contentType || 'all'}`,
    );
    return this.courseContentService.remove(id, +step, contentType);
  }
}

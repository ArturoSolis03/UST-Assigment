import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProjectDto } from './app.dto';
import { updateProjectDto } from './appUpdate.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt.guards';

@UseGuards(JwtAuthGuard)
@ApiTags('Projects')
@Controller('projects')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  async checkDbConnection() {
  return this.appService.healthCheck();
  }


  @Get()
  @ApiOperation({summary: 'Get all the projects'})
  @ApiQuery({name: 'page', required: false, example: 0})
  @ApiQuery({name: 'limit', required: false, example: 12})
  async findAll(
    @Query('page') page = '0',
    @Query('limit') limit = '12',
  ){
    const pageNumber = parseInt(page,10); 
    const limitNumber = parseInt(limit, 10);
    return this.appService.getAll(pageNumber, limitNumber);
  }

  @Get(':id')
  @ApiOperation({summary: 'Get a project by ID'})
  @ApiResponse({status: 200, description: 'Project found'})
  findOne(@Param('id') id: string){
    return this.appService.findOne(id);
  }

  @Post()
  @ApiOperation({summary: 'Create new project'})
  @ApiResponse({status: 201, description: 'Project created successfully'})
  create (@Body() CreateProjectDto: CreateProjectDto){
    return this.appService.create(CreateProjectDto);
  }

  @Put(':id')
  @ApiOperation({summary: 'Update a project'})
  @ApiResponse({status: 201, description: 'Project update successfully'})
  update(@Param('id') id : string, @Body() dto: updateProjectDto){
    return this.appService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete a project'})
  @ApiResponse({status: 201, description: 'Project delete successfully'})
  remove(@Param('id') id : string){
    return this.appService.remove(id);
  }




}

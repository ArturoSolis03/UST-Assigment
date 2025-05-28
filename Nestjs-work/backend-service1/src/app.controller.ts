import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProjectDto } from './app.dto';
import { updateProjectDto } from './appUpdate.dto';

@Controller('projects')
export class AppController {
  constructor(private readonly appService: AppService) {}

    @Get('health')
  async checkDbConnection() {
  return this.appService.healthCheck();
}

  @Get()
  async findAll(
    @Query('page') page = '0',
    @Query('limit') limit = '10',
  ){
    const pageNumber = parseInt(page, 10); 
    const limitNumber = parseInt(limit, 10);
    return this.appService.getAll(pageNumber, limitNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.appService.findOne(id);
  }

  @Post()
  create (@Body() CreateProjectDto: CreateProjectDto){
    return this.appService.create(CreateProjectDto);
  }

  @Put(':id')
  update(@Param('id') id : string, @Body() dto: updateProjectDto){
    return this.appService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id : string){
    return this.appService.remove(id);
  }




}

import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
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
  findAll(){
    return this.appService.getAll();
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

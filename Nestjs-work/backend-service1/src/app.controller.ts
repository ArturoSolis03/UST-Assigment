import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProjectDto } from './app.dto';

@Controller('projects')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create (@Body() CreateProjectDto: CreateProjectDto){
    return this.appService.create(CreateProjectDto);
  }

}

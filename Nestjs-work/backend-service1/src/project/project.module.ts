
import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service'; 
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './project.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{name: Project.name, schema: ProjectSchema}])
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class ProjectModule {}

import * as path from 'path';
import * as fs from 'fs/promises';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './app.dto';
import { updateProjectDto } from './appUpdate.dto';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './project/project.schema';
import { InjectModel } from '@nestjs/mongoose';

 
@Injectable()
export class AppService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  findAll(): Promise<Project[]>{
    return this.projectModel.find().exec();
  }

  async findOne(id: string) : Promise<Project>{
    const project = await this.projectModel.findById(id).exec();
    if(!project) throw new NotFoundException('Not found');
    return project;
  }
 
  create(createDto: CreateProjectDto) : Promise<Project>{
    const project = new this.projectModel(createDto);
    return project.save();
  }

  async update(id: string, updateDto: updateProjectDto) : Promise<Project>{
    const updated = await this.projectModel.findByIdAndUpdate(id, updateDto, {
      new : true,
    }).exec();
    if(!updated) throw new NotFoundException('Not Found');
    return updated;
  }

  async remove(id: string) : Promise<void>{
    const res = await this.projectModel.findByIdAndDelete(id).exec();
    if(!res) throw new NotFoundException('Not found');
  }
}

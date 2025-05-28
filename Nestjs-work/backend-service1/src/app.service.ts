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

  async getAll(page: number = 1, limit: number = 10): Promise<Project[]>{
    const skip = page * limit;
    return this.projectModel.find().skip(skip).limit(limit).exec();
  }

  async findOne(id: string) : Promise<Project | null>{
    const project = this.projectModel.findById(id);
    if(!project){
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
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

 
async healthCheck(): Promise<{ message: string }> {
    try {
      await this.projectModel.findOne(); // o .countDocuments()
      return { message: 'Database is connected' };
    } catch (error) {
      throw new Error('Database connection failed');
    }
  }
 
}

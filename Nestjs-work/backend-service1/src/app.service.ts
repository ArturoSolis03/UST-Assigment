import * as path from 'path';
import * as fs from 'fs/promises';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './app.dto';
import { Project } from './app.entity';
import { updateProjectDto } from './appUpdate.dto';
 
@Injectable()
export class AppService {
  private readonly dbPath = path.join(process.cwd(), 'db.json');
 
  private async readDb() {
    const data = await fs.readFile(this.dbPath, 'utf-8');
    return JSON.parse(data);
  }
 
  private async writeDb(data: any) {
    await fs.writeFile(this.dbPath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async getAll() : Promise<Project[]>{
    const data = await fs.readFile(this.dbPath, 'utf-8');
    return JSON.parse(data);
  }

  async getById(id: number) : Promise<Project>{
    const projects = await this.getAll();
    const project = projects.find((p) => p.id === id);
    if(!project) throw new NotFoundException('Not found');
    return project;
  }
 
  async create(createProjectDto: CreateProjectDto) {
    try{
    const db = await this.readDb();
    const newProject = {
      id: Date.now(),
      ...createProjectDto,
    };
    db.projects.push(newProject);
    await this.writeDb(db);
    return newProject;
    }catch(error){
      console.log('Error', error);
      throw new InternalServerErrorException('Failed to create');
    }
  }

  async update(id: number, updateDto: updateProjectDto) : Promise<Project>{
    const projects = await this.getAll();
    const index = projects.findIndex((p) => p.id === id);
    if(index === -1) throw new NotFoundException('Not Found');

    const updateProject = {...projects[index], updateDto};
    projects[index] = updateProject;

    await fs.writeFile(this.dbPath, JSON.stringify(projects, null, 2));
    return updateProject;
  }

  async remove(id: number) : Promise<void>{
    let projects = await this.getAll();
    const projectExists = projects.some((p) => p.id === id);
    if(!projectExists) throw new NotFoundException('Not found');

    projects = projects.filter((p) => p.id === id);
    await fs.writeFile(this.dbPath, JSON.stringify(projects, null, 2));
  }
}

import * as path from 'path';
import * as fs from 'fs/promises';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProjectDto } from './app.dto';
 
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
}

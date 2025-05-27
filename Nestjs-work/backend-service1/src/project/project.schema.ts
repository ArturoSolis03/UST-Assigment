
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'


export type ProjectDocument = Project & Document;

@Schema()
export class Project{
    @Prop({required: true, maxlength: 100})
    name: string;

    @Prop({required: true, maxlength: 2000})
    description: string;

    @Prop({required: true, type: Number})
    budget: number;

    @Prop({required: true})
    isActive: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
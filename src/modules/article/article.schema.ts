import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ArticleDocument = Article & Document

@Schema()
export class Article {
  @Prop({ require: true })
  author: string;

  @Prop({ require: true })
  content: string;

  @Prop({ require: true })
  slug: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article)
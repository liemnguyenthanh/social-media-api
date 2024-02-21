import { BaseEntity } from "src/modules/shared/base/base.entiry";

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ArticleDocument = Article & Document
@Schema()
export class Article extends BaseEntity {
  @Prop({ require: true })
  author: string;

  @Prop({ require: true })
  content: string;

  @Prop({ require: true })
  slug: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article)
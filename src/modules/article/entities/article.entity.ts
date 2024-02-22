import { BaseEntity } from 'src/modules/shared/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/modules/user/entities/user.entity';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article extends BaseEntity {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, require: true })
  author: User;

  @Prop({ require: true })
  content: string;

  @Prop({ require: true })
  slug: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

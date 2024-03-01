import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseEntity } from 'src/modules/shared/base/base.entity';
import { User } from 'src/modules/user/entities/user.entity';

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Article extends BaseEntity {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, require: true })
  @Type(() => User)
  author: User;

  @Prop({ require: true })
  content: string;

  @Prop()
  attachments?: string[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

import { Prop } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';

export class BaseEntity {
  @Transform((value) => value.obj._id.toString())
  _id?: string;

  created_at?: Date;

  updated_at?: Date;

  @Prop({ default: null, select: false })
  deleted_at: Date;
}

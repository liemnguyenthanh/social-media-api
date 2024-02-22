import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseEntity } from 'src/modules/shared/base/base.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User extends BaseEntity {
  @Prop({ require: true, unique: true })
  username: string;

  @Prop({ require: true })
  full_name: string;

  @Prop()
  phone?: string;

  @Prop({ require: true, select: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

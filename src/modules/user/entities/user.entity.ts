import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseEntity } from "src/modules/shared/base/base.entiry"

export type UserDocument = User & Document

@Schema()
export class User extends BaseEntity {
  @Prop({ require: true })
  username: string;

  @Prop({ require: true, select: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)

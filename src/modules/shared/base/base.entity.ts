import { Prop } from "@nestjs/mongoose"
import { ObjectId } from "mongoose";

export class BaseEntity {
  _id?: ObjectId;

  created_at?: Date;
  
  updated_at?: Date;

  @Prop({ default: null })
  deleted_at: Date
}
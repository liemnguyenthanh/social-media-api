import { Prop } from "@nestjs/mongoose"

export class BaseEntity {
  _id?: string;

  @Prop({ required: true })
  created_at: Date;

  @Prop({ default: null })
  deleted_at: Date
}
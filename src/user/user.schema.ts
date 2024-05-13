import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;

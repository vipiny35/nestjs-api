import { addModelToTypegoose, buildSchema, mongoose, prop } from "@typegoose/typegoose";
import { IsString } from "class-validator";
// import { getModelForClass } from "@typegoose/typegoose";

export class User {
  @prop()
  name: string;

  @prop({ unique: true })
  email: string;

  @prop({ default: false })
  verified: boolean;

  @prop({ type: [String], default: [] })
  languages: string[]

  @prop({ required: true, default: [] })
  hobbies: mongoose.Types.Array<string>;

}

export const UserSchema = buildSchema(User, { timestamps: true })

// UserSchema.plugin(() => {}, {});

// export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } });
export const UserModel = addModelToTypegoose(mongoose.model('User', UserSchema), User);


export class UserInput {
  @IsString()
  name: string;
  
  @IsString()
  email: string;
}
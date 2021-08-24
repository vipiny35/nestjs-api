import { addModelToTypegoose, buildSchema, mongoose, prop } from "@typegoose/typegoose";
import { Exclude, Expose } from "class-transformer";
import { IsArray, IsEmail, IsString } from "class-validator";
// import { getModelForClass } from "@typegoose/typegoose";

export class User {
  @prop()
  name: string;

  @IsEmail()
  @prop({ unique: true })
  email: string;

  @Exclude()
  @prop()
  password: string;

  @prop({ default: false })
  verified: boolean;

  @prop({ type: [String], default: [] })
  languages: string[]

  @prop({ required: true, default: [] })
  hobbies: mongoose.Types.Array<string>;

  @Expose()
  get nameEmail(): string {
    return `${this.name} ${this.email}`;
  }

}

export const UserSchema = buildSchema(User, { timestamps: true })

// UserSchema.plugin(() => {}, {});

// export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } });
export const UserModel = addModelToTypegoose(mongoose.model('User', UserSchema), User);


export class UserInput {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsArray()
  hobbies: string[]
}

export class UserResponse {

  @Expose()
  name: string;

  @Expose()
  email: string

  @Expose()
  hobbies: string[]
}
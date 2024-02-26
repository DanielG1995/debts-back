import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty } from "class-validator"

@InputType()
export class LoginInput{
    @Field(()=>String)
    @IsEmail()
    email:string

    @IsNotEmpty()
    @Field(()=>String)
    name:string

    @IsNotEmpty()
    @Field(()=>String)
    img:string
}
import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator"

@InputType()
export class SignupInput {
    @Field(() => String)
    @IsEmail()
    email: string

    @IsNotEmpty()
    @Field(() => String)
    name: string

    @Field(() => String)
    @IsOptional()
    img: string

}
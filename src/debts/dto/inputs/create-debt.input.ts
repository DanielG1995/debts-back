import { Field, ID, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";
import { User } from "src/users/entities/user.entity";

@InputType()
export class CreateDebtInput {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    description: string

    @Field(() => ID)
    @IsNotEmpty()
    debtor: string

    @Field(() => ID)
    @IsNotEmpty()
    creditor: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    maxDate?: string

    @IsNumber()
    @Field(() => Number)
    @Min(0)
    amount: number

}
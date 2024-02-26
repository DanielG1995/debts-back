import { Field, ID, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";

@InputType()
export class UpdateDebtInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    @MaxLength(40)
    description: string

    @Field(() => ID)
    @IsString()
    @IsOptional()
    id: string

    @Field(() => ID, { nullable: true })
    @IsOptional()
    creditor: string

    @IsNumber()
    @Field(() => Number, { nullable: true })
    @Min(0)
    @IsOptional()
    amount: number

}
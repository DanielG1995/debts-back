import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class CreatePaymentInput {
  @Field(() => Float, { description: 'Monto a cancelar' })
  @IsNumber()
  paidAmount: number;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  paymentDate?: Date;

  @Field(() => ID)
  @IsNotEmpty()
  debt: string;
}

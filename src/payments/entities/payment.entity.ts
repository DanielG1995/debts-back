import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Debt } from 'src/debts/entity/debt.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'payments' })
@ObjectType()
export class Payment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Debt, (debt) => debt.payments)
  @Field(() => Debt)
  debt: Debt;

  @Field(() => Number)
  @Column()
  paidAmount: number;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true, default: new Date() })
  paymentDate?: Date;
}
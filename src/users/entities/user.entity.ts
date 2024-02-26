import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Debt } from 'src/debts/entity/debt.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string


  @Field(() => String)
  @Column({ unique: true })
  email: string

  @Field(() => String)
  @Column()
  name: string


  @Field(() => String)
  @Column()
  img: string

  @Field(() => [Debt])
  @OneToMany(() => Debt, (debt) => debt.debtor, { lazy: true })
  debtsAsDebtor: Debt[]

  @Field(() => [Debt])
  @OneToMany(() => Debt, (debt) => debt.creditor, { lazy: true })
  debtsAsCreditor: Debt[]

}

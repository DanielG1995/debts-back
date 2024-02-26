import { Field, Float, ID, ObjectType } from "@nestjs/graphql"
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Payment } from "src/payments/entities/payment.entity"
import { User } from "src/users/entities/user.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'debts' })
@ObjectType()
export class Debt {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string

    @Column()
    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    description: string

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsDateString()
    date?: string

    @ManyToOne(() => User, (user) => user.debtsAsDebtor, { lazy: true })
    @Field(() => User)
    @IsNotEmpty()
    @JoinColumn()
    debtor: User


    @ManyToOne(() => User, (user) => user.debtsAsCreditor, { lazy: true })
    @Field(() => User)
    @IsNotEmpty()
    @JoinColumn()
    creditor: User

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsDateString()
    maxDate?: string

    @Column({ default: false })
    @Field(() => Boolean)
    @IsBoolean()
    done: boolean = false

    @Field(() => [Payment])
    @OneToMany(() => Payment, (payment) => payment.debt)
    @JoinColumn()
    payments: Payment[];

    @Column()
    @Field(() => Float)
    @IsNumber()
    amount: number


}
import { Args, Float, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Debt } from './entity/debt.entity';
import { DebtsService } from './debts.service';
import { CreateDebtInput } from './dto/inputs/create-debt.input';
import { PaymentsService } from 'src/payments/payments.service';
import { Payment } from 'src/payments/entities/payment.entity';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';
import { UpdateDebtInput } from './dto/inputs/update-debt.input';

@Resolver(() => Debt)
export class DebtsResolver {

    constructor(
        private readonly debtsService: DebtsService,
        private readonly paymentService: PaymentsService
    ) { }

    @Query(() => [Debt], { name: 'debts' })
    getDebts(): Promise<Debt[]> {
        return this.debtsService.getDebts()
    }

    @Mutation(() => Debt)
    createDebt(
        @Args('createDebtInput') createDebtInput: CreateDebtInput
    ): Promise<Debt> {
        return this.debtsService.createDebt(createDebtInput)
    }

    @Mutation(() => Debt)
    updateDebt(
        @Args('updateDebtInput') updateDebtInput: UpdateDebtInput
    ): Promise<Debt> {
        return this.debtsService.updateDebt(updateDebtInput.id, updateDebtInput)
    }

    @Mutation(() => String)
    deleteDebt(
        @Args('id') id: string
    ): Promise<String> {
        return this.debtsService.deleteDebtById(id)
    }

    @Query(() => Debt, { name: 'debt' })
    getDebt(@Args('id') id: string): Promise<Debt> {
        return this.debtsService.getDebtById(id)
    }


    @Query(() => [Debt], { name: 'debtsByDebtor' })
    getDebtsByDebtor(@Args('id') id: string): Promise<Debt[]> {
        return this.debtsService.getDebtsByDebtor(id)
    }

    @Query(() => [Debt], { name: 'debtsByCreditor' })
    getDebtsByCreditor(@Args('id') id: string): Promise<Debt[]> {
        return this.debtsService.getDebtsByCreditor(id)
    }

    @ResolveField(() => Float)
    async totalPaidMount(
        @Parent() debt: Debt
    ): Promise<number> {
        return this.paymentService.totalPaidMountByDebt(debt)
    }

    @ResolveField(() => Float)
    async totalPending(
        @Parent() debt: Debt
    ): Promise<number> {
        return debt.amount - await this.paymentService.totalPaidMountByDebt(debt)
    }

    @ResolveField(() => [Payment], { name: 'payments' })
    async getPaymentsList(
        @Parent() debt: Debt,
        @Args() paginationArgs: PaginationArgs,
    ): Promise<Payment[]> {
        return this.paymentService.findAll(debt, paginationArgs)
    }

}

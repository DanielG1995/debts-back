import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';
import { Debt } from 'src/debts/entity/debt.entity';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationArgs } from 'src/common/dto/args';

@Injectable()
export class PaymentsService {

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>
  ) { }

  async create(createPaymentInput: CreatePaymentInput): Promise<Payment> {
    const { debt, ...rest } = createPaymentInput
    const newPayment = this.paymentRepository.create({ ...rest, debt: { id: debt } })
    return await this.paymentRepository.save(newPayment)
  }

  async findAll(debt: Debt, paginationArgs: PaginationArgs): Promise<Payment[]> {
    const { limit, offset } = paginationArgs
    const queryBuilder = this.paymentRepository.createQueryBuilder()
      .take(limit)
      .skip(offset)
      .where(`"debtId"=:debtId`, { debtId: debt.id })

    return queryBuilder.getMany()
  }


  getPaymentById(id: string): Promise<Payment> {
    const payment = this.paymentRepository.findOneBy({ id })
    if (!payment) throw new NotFoundException(`Payment does not exist with id ${id}`)
    return payment
  }

  update(id: number, updatePaymentInput: UpdatePaymentInput) {
    return `This action updates a #${id} payment`;
  }

  remove(id: string) {
    const payment = this.paymentRepository.delete({ id })
    if (!payment) throw new NotFoundException(`Payment does not exist with id ${id}`)
    return id
  }

  async totalPaidMountByDebt(debt: Debt): Promise<number> {
    const result = await this.paymentRepository.createQueryBuilder('payment')
      .select('SUM(payment.paidAmount)', 'totalPaidAmount')
      .where('payment.debtId = :debtId', { debtId: debt.id })
      .getRawOne();

    return result.totalPaidAmount || 0;
  }
}

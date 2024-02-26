import { Injectable, NotFoundException } from '@nestjs/common';
import { Debt } from './entity/debt.entity';
import { CreateDebtInput } from './dto/inputs/create-debt.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UpdateDebtInput } from './dto/inputs/update-debt.input';

@Injectable()
export class DebtsService {



    constructor(
        @InjectRepository(Debt)
        private readonly debtsRepository: Repository<Debt>

    ) { }

    getDebts(): Promise<Debt[]> {
        return this.debtsRepository.find()
    }

    getDebtsByCreditor(id: string): Promise<Debt[]> {
        return this.debtsRepository.findBy({ creditor: { id } })
    }

    getDebtsByDebtor(id: string): Promise<Debt[]> {
        return this.debtsRepository.findBy({ debtor: { id } })
    }

    getDebtById(id: string): Promise<Debt> {
        const debt = this.debtsRepository.findOneBy({ id })
        if (!debt) throw new NotFoundException(`Debt does not exist with id ${id}`)
        return debt
    }
    async updateDebt(id: string, updateDebtInput: UpdateDebtInput): Promise<Debt> {
        await this.debtsRepository.update(id, { ...updateDebtInput, creditor: { id: updateDebtInput.creditor } });
        return await this.getDebtById(id)
    }

    async deleteDebtById(id: string): Promise<String> {
        await this.debtsRepository.delete(id);
        return id
    }

    async createDebt(createDebtInput: CreateDebtInput): Promise<Debt> {
        const { debtor, creditor, ...rest } = createDebtInput
        const newDebt = this.debtsRepository.create({ ...rest, creditor: { id: creditor }, debtor: { id: debtor } })
        return await this.debtsRepository.save(newDebt)
    }

    async getTotalDebtByUser(user: User): Promise<number> {
        const result = await this.debtsRepository.createQueryBuilder('debt')
            .select('SUM(debt.amount)', 'totalDebtAmount')
            .where('debt.debtorId = :userId', { userId: user.id })
            .getRawOne();

        return result.totalDebtAmount || 0;
    }

    async getTotalPendingByUser(user: User): Promise<number> {
        const result = await this.debtsRepository.createQueryBuilder('debt')
            .select('SUM(debt.amount)', 'totalPendingAmount')
            .where('debt.creditorId = :userId', { userId: user.id })
            .getRawOne();

        return result.totalPendingAmount || 0;
    }
}

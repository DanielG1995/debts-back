import { Module } from '@nestjs/common';
import { DebtsResolver } from './debts.resolver';
import { DebtsService } from './debts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debt } from './entity/debt.entity';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  providers: [DebtsResolver, DebtsService],
  imports: [
    TypeOrmModule.forFeature([Debt]),
    PaymentsModule
  ],
  exports:[DebtsService]
})
export class DebtsModule { }

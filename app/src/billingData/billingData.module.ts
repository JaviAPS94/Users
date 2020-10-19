import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { BillingDataController } from './billingData.controller';
import { BillingDataService } from './billingData.service';

@Module({
  imports: [UserModule],
  controllers: [BillingDataController],
  providers: [BillingDataService]
})
export class BillingDataModule { }
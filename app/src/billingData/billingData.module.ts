import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { BillingDataController } from './billingData.controller';
import { BillingDataService } from './billingData.service';
import BillingDataTransformer from './transformers/billingData.transformer';

@Module({
  imports: [UserModule],
  controllers: [BillingDataController],
  providers: [BillingDataService, BillingDataTransformer]
})
export class BillingDataModule { }
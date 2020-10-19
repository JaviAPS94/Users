import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingDataModule } from './billingData/billingData.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './users/user.module';
import { EntityManagerWrapperService } from './utils/entity-manager-wrapper.service';

@Module({
  imports: [HealthModule, TypeOrmModule.forRoot(), UserModule, BillingDataModule],
  providers: [EntityManagerWrapperService],
  controllers: []
})
export class AppModule { }

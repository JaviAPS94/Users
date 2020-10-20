import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingDataModule } from './billingData/billingData.module';
import { HealthModule } from './health/health.module';
import { ShippingAddressModule } from './shippingAddress/shippingAddress.module';
import { UserModule } from './users/user.module';
import { EntityManagerWrapperService } from './utils/entity-manager-wrapper.service';

@Module({
  imports: [HealthModule, TypeOrmModule.forRoot(), UserModule, BillingDataModule, ShippingAddressModule],
  providers: [EntityManagerWrapperService],
  controllers: []
})
export class AppModule { }

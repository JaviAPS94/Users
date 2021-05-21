import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingDataModule } from './billingData/billingData.module';
import { HealthModule } from './health/health.module';
import { LivingPlaceModule } from './livingPlace/livingPlace.module';
import { ShippingAddressModule } from './shippingAddress/shippingAddress.module';
import { UserModule } from './users/user.module';
import { EntityManagerWrapperService } from './utils/entity-manager-wrapper.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    HealthModule,
    TypeOrmModule.forRoot(),
    UserModule,
    BillingDataModule,
    ShippingAddressModule,
    LivingPlaceModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 12000,
    }),
  ],
  providers: [
    EntityManagerWrapperService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: []
})
export class AppModule { }

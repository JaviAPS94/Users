import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingDataModule } from './billingData/billingData.module';
import { HealthModule } from './health/health.module';
import { LivingPlaceModule } from './livingPlace/livingPlace.module';
import { ShippingAddressModule } from './shippingAddress/shippingAddress.module';
import { UserModule } from './users/user.module';
import { EntityManagerWrapperService } from './utils/entity-manager-wrapper.service';
import * as dotenv from 'dotenv';
import { APP_GUARD } from '@nestjs/core';

dotenv.config();
@Module({
  imports: [HealthModule,
    TypeOrmModule.forRoot({
      name: "default",
      type: "mysql",
      host: process.env.DB_HOST_READ,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME_READ,
      password: process.env.MYSQL_PASSWORD_READ,
      database: process.env.MYSQL_DATABASE_READ,
      synchronize: false,
      logging: false,
      entities: [
        process.env.ENTITY_PATH
      ],
      migrations: [
        process.env.MIGRATION_PATH
      ],
      subscribers: [
        process.env.SUBSCRIBERS_PATH
      ],
      cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber"
      }
    }),
    TypeOrmModule.forRoot({
      name: "write",
      type: "mysql",
      host: process.env.DB_HOST_WRITE,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME_WRITE,
      password: process.env.MYSQL_PASSWORD_WRITE,
      database: process.env.MYSQL_DATABASE_WRITE,
      synchronize: false,
      logging: false,
      entities: [
        process.env.ENTITY_PATH
      ],
      migrations: [
        process.env.MIGRATION_PATH
      ],
      subscribers: [
        process.env.SUBSCRIBERS_PATH
      ],
      cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber"
      }
    }),
    UserModule,
    BillingDataModule,
    ShippingAddressModule,
    LivingPlaceModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 12000,
    })],
  providers: [EntityManagerWrapperService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }],
  controllers: []
})
export class AppModule { }

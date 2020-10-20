import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { BillingDataModule } from '../../../src/billingData/billingData.module';
import { LivingPlaceModule } from '../../../src/livingPlace/livingPlace.module';
import { ShippingAddressModule } from '../../../src/shippingAddress/shippingAddress.module';
import { UserModule } from '../../../src/users/user.module';
import { mockBillingData } from '../../mock-billing-data';
import { mockLivingPlace } from '../../mock-living-place';
import { mockShippingAddress } from '../../mock-shipping-address';
import { mockUser } from '../../mock-user';

describe('User AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule, BillingDataModule, ShippingAddressModule, LivingPlaceModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'db-test',
          port: 3306,
          username: 'test',
          password: 'test',
          database: 'e2e-test',
          entities: ['src/entity/**/*.ts'],
          synchronize: true,
        })],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Api BillingData (GET)', () => {
    const result = request(app.getHttpServer())
      .get('/api/billing-data')
      .set('uid', '132')
      .expect(HttpStatus.NOT_FOUND);
    return result;
  });

  it('Api ShippingAddress (GET)', () => {
    const result = request(app.getHttpServer())
      .get('/api/shipping-address')
      .set('uid', '132')
      .expect(HttpStatus.NOT_FOUND);
    return result;
  });

  it('Api LivingPlace (GET)', () => {
    const result = request(app.getHttpServer())
      .get('/api/living-places')
      .expect(HttpStatus.NOT_FOUND);
    return result;
  });

  it('Api User (POST)', () => {
    const result = request(app.getHttpServer())
      .post('/api/users')
      .set('uid', 'test')
      .send(mockUser.usersE2E[0])
      .expect(HttpStatus.CREATED)
    return result;
  });

  it('Api BillingData (POST)', () => {
    const result = request(app.getHttpServer())
      .post('/api/billing-data').send(mockBillingData.billingData[0])
      .expect(HttpStatus.CREATED);
    return result;
  });

  it('Api BillingData (PUT)', () => {
    const result = request(app.getHttpServer())
      .put('/api/billing-data/1').send(mockBillingData.billingData[0])
      .expect(HttpStatus.OK);
    return result;
  });

  it('Api BillingData (DELETE)', () => {
    const result = request(app.getHttpServer())
      .delete('/api/billing-data/1')
      .expect(HttpStatus.OK);
    return result;
  });

  it('Api ShippingAddress (POST)', () => {
    const result = request(app.getHttpServer())
      .post('/api/shipping-address').send(mockShippingAddress.shippingAddress[0])
      .expect(HttpStatus.CREATED);
    return result;
  });

  it('Api ShippingAddress (PUT)', () => {
    const result = request(app.getHttpServer())
      .put('/api/shipping-address/1').send(mockShippingAddress.shippingAddress[0])
      .expect(HttpStatus.OK);
    return result;
  });

  it('Api ShippingAddress (DELETE)', () => {
    const result = request(app.getHttpServer())
      .delete('/api/shipping-address/1')
      .expect(HttpStatus.OK);
    return result;
  });

  it('Api LivingPlace (POST)', () => {
    const result = request(app.getHttpServer())
      .post('/api/living-places').send(mockLivingPlace.livingPlaces[0])
      .expect(HttpStatus.CREATED);
    return result;
  });

  it('Api LivingPlace (PUT)', () => {
    const result = request(app.getHttpServer())
      .put('/api/living-places/1').send(mockLivingPlace.livingPlaces[0])
      .expect(HttpStatus.OK);
    return result;
  });

  it('Api LivingPlace (DELETE)', () => {
    const result = request(app.getHttpServer())
      .delete('/api/living-places/1')
      .expect(HttpStatus.OK);
    return result;
  });
});
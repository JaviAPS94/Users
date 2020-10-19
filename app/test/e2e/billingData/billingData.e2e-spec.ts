import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingDataModule } from '../../../src/billingData/billingData.module';
import * as request from 'supertest';
import { UserModule } from '../../../src/users/user.module';
import { mockBillingData } from '../../../test/mock-billing-data';
import { mockUser } from '../../../test/mock-user';

describe('BillingData AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule, BillingDataModule,
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

  it('Api User (POST)', () => {
    const result = request(app.getHttpServer())
      .post('/api/users')
      .set('uid', 'test')
      .send(mockUser.users[0])
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
});
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import {HealthcheckIndicator}  from './health.service';
import { TerminusModule } from '@nestjs/terminus';
import { assert } from 'console';

describe('Health Controller', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
      providers: [HealthcheckIndicator]
    }).compile();

    healthController = module.get<HealthController>(HealthController);
  });


  it('healthcheck should return status up', async () => {
    const expectedResponse= "{status: 'ok',info: { 'ms-users': { status: 'up' } },error: {},details: { 'ms-users': { status: 'up' } }}";
    
    const response= await healthController.healthcheck();
    
    expect(healthController.healthcheck()).toBeCalled;
    assert(response, expectedResponse);
  });
});

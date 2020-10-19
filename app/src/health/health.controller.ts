import { Controller, Get, Injectable } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { HealthcheckIndicator } from './health.service';

@Controller('health')
@Injectable()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private healthcheckIndicator: HealthcheckIndicator
  ) {}

    @Get()
    @HealthCheck()
    healthcheck() {
      return this.health.check([
        async () => this.healthcheckIndicator.isHealthy()
      ]);
    }
}

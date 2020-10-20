import { Module } from '@nestjs/common';
import { LivingPlaceController } from './livingPlace.controller';
import { LivingPlaceService } from './livingPlace.service';

@Module({
  controllers: [LivingPlaceController],
  providers: [LivingPlaceService]
})
export class LivingPlaceModule { }
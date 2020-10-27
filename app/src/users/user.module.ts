import { Module } from '@nestjs/common';
import { UserTransformer } from './transformers/user.transformer';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserTransformer],
  exports: [UserService]
})
export class UserModule { }

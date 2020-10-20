import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { ShippingAddressController } from './shippingAddress.controller';
import { ShippingAddressService } from './shippingAddress.service';

@Module({
  imports: [UserModule],
  controllers: [ShippingAddressController],
  providers: [ShippingAddressService]
})
export class ShippingAddressModule { }
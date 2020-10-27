import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { ShippingAddressController } from './shippingAddress.controller';
import { ShippingAddressService } from './shippingAddress.service';
import { ShippingAddressTransformer } from './transformers/shippingAddress.transformer';

@Module({
  imports: [UserModule],
  controllers: [ShippingAddressController],
  providers: [ShippingAddressService, ShippingAddressTransformer]
})
export class ShippingAddressModule { }
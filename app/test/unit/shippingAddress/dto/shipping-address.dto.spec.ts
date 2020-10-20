import { UnprocessableEntityException } from '@nestjs/common';
import { ShippingAddressDto } from '../../../../src/shippingAddress/dto/shipping-address.dto';
import { ValidationPipe } from '../../../../src/validation.pipe';

describe('ShippingAddressDto', () => {
  let validationPipe: ValidationPipe;
  let valueObject;

  beforeEach(() => {
    validationPipe = new ValidationPipe();
  });

  it('should return value object if validation is successful', async () => {
    valueObject = {
      uid: "test",
      default: true,
      lat: 0.67,
      lng: 0.89,
      mainStreet: "Heleodoro Ayaala",
      number: "E9A",
      secondaryStreet: "Pasaje S12F",
      addressReference: "Arriba sector el triangulo",
      livingPlace: {
        id: 1,
        fields: [
          {
            id: "test",
            value: "test"
          }
        ]
      }
    };
    expect(await validationPipe.transform(valueObject, { type: "body", metatype: ShippingAddressDto })).toBe(valueObject);
  });

  it('should throw exception if validation fails', async () => {
    valueObject = {
      default: true,
      lat: 0.67,
      lng: 0.89,
      mainStreet: "Heleodoro Ayaala",
      number: "E9A",
      secondaryStreet: "Pasaje S12F",
      addressReference: "Arriba sector el triangulo"
    };
    await expect(validationPipe.transform(valueObject, { type: "body", metatype: ShippingAddressDto })).rejects.toThrow(UnprocessableEntityException);
  });
});
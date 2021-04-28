import { UnprocessableEntityException } from '@nestjs/common';
import { ShippingAddressDto } from '../../../../src/shippingAddress/dto/shipping-address.dto';
import { ValidationPipe } from '../../../../src/validation.pipe';
import {createConnections, getConnection} from "typeorm";
import {LivingPlaceConstraint} from "../../../../src/utils/custom-validations.service";

jest.mock('../../../../src/utils/entity-manager-wrapper.service');

beforeAll(async () => {
  await createConnections()
})

afterAll(async () => {
  const defaultConnection = getConnection('default')
  await defaultConnection.close()
})

describe('ShippingAddressDto', () => {
  let validationPipe: ValidationPipe;
  let valueObject;

  beforeEach(() => {
    validationPipe = new ValidationPipe();
  });

  it('should return value object if validation is successful', async () => {
    mockLivingPlaceContraint();
    valueObject = {
      uid: "test",
      default: true,
      lat: 0.67,
      lng: 0.89,
      mainStreet: "Heleodoro Ayaala",
      number: "E9A",
      secondaryStreet: "Pasaje S12F",
      reference: "Arriba sector el triangulo",
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
    mockLivingPlaceContraint();
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

const mockLivingPlaceContraint = () => {
  const livingPlaceContraint = LivingPlaceConstraint.prototype.validLivingPlace = jest.fn();
  return livingPlaceContraint.mockReturnValue(true);
};
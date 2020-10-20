import { UnprocessableEntityException } from '@nestjs/common';
import { LivingPlaceDto } from '../../../../src/livingPlace/dto/living-place.dto';
import { ValidationPipe } from '../../../../src/validation.pipe';

describe('LivingPlaceDto', () => {
  let validationPipe: ValidationPipe;
  let valueObject;

  beforeEach(() => {
    validationPipe = new ValidationPipe();
  });

  it('should return value object if validation is successful', async () => {
    valueObject = {
      name: "Edificio",
      active: true,
      fields: [
        {
          id: "name",
          messages: {
            min: "Minimo 5",
            max: "Maximo 30"
          },
          label: "Nombre del edificio",
          rules: {
            min: 2,
            max: 20
          }
        }
      ],
      countryId: 2
    };
    expect(await validationPipe.transform(valueObject, { type: "body", metatype: LivingPlaceDto })).toBe(valueObject);
  });

  it('should throw exception if validation fails', async () => {
    valueObject = {
      name: "Edificio",
      active: true,
      fields: [
        {
          id: "name",
          messages: {
            min: "Minimo 5",
            max: "Maximo 30"
          },
          label: "Nombre del edificio",
          rules: {
            min: 2,
            max: 20
          }
        }
      ]
    };
    await expect(validationPipe.transform(valueObject, { type: "body", metatype: LivingPlaceDto })).rejects.toThrow(UnprocessableEntityException);
  });
});
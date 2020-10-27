import { UnprocessableEntityException } from '@nestjs/common';
import { BillingDataDto } from '../../../../src/billingData/dto/billing-data.dto';
import { ValidationPipe } from '../../../../src/validation.pipe';

describe('BillingDataDto', () => {
  let validationPipe: ValidationPipe;
  let valueObject;

  beforeEach(() => {
    validationPipe = new ValidationPipe();
  });

  it('should return value object if validation is successful', async () => {
    valueObject = {
      nickname: "test",
      name: "test",
      documentType: "CI",
      document: "1719711176",
      address: "Quito",
      phone: "0958963171",
      email: "alex.pinaida@trade.ec",
      uid: "test",
      default: true,
      country: {
        id: 1,
        name: "Ecuador"
      }
    };
    expect(await validationPipe.transform(valueObject, { type: "body", metatype: BillingDataDto })).toBe(valueObject);
  });

  it('should throw exception if validation fails', async () => {
    valueObject = {
      nickname: "test",
      name: "test",
      documentType: "TEST",
      document: "1719711176",
      address: "Quito",
      phone: "0958963171",
      email: "alex.pinaida@trade.ec",
      default: true
    };
    await expect(validationPipe.transform(valueObject, { type: "body", metatype: BillingDataDto })).rejects.toThrow(UnprocessableEntityException);
  });
});
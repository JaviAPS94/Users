import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BillingDataController } from '../../../src/billingData/billingData.controller';
import { BillingDataService } from '../../../src/billingData/billingData.service';
import { BillingDataDto } from '../../../src/billingData/dto/billing-data.dto';
import { orderByEnum } from '../../../src/billingData/enums/order-by.enum';
import { BillingDataTransformer } from '../../../src/billingData/transformers/billingData.transformer';
import { UserModule } from '../../../src/users/user.module';
import { mockBillingData } from '../../../test/mock-billing-data';

describe('BillingData Controller', () => {
  let billingDataController: BillingDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      controllers: [BillingDataController],
      providers: [BillingDataService, BillingDataTransformer]
    }).compile();
    billingDataController = module.get<BillingDataController>(BillingDataController);
  });

  it('POST should return 201 when post data is Ok', async () => {
    const createBillingData = BillingDataService.prototype.saveBillingData = jest.fn();
    createBillingData.mockReturnValue(mockBillingData.billingDataEntity[0]);
    const billingDataDto = new BillingDataDto();
    Object.assign(billingDataDto, mockBillingData.billingData[0]);

    const returnedValue = await billingDataController.create(billingDataDto);
    expect(createBillingData).toHaveBeenCalled();
    expect(returnedValue).toEqual(mockBillingData.billingDataResponseOldVersion[0]);
  });

  it('POST should return 403 when data to post is invalid', async () => {
    const createBillingData = BillingDataService.prototype.saveBillingData = jest.fn();
    createBillingData.mockImplementation(() => {
      throw new Error('error');
    });
    const billingDataDto = new BillingDataDto();
    Object.assign(billingDataDto, mockBillingData.billingData[0]);

    expect.assertions(3);

    try {
      await billingDataController.create(billingDataDto);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('The input data is invalid');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }

  });

  it('GET should return 200 when get billing data is OK', async () => {
    const getBillingData = BillingDataService.prototype.getBillingData = jest.fn();
    getBillingData.mockReturnValue(mockBillingData.billindDataPaginated[0]);
    const expectedResult = mockBillingData.billingDataPaginatedOldVersion[0];
    const uid = '132';
    const page = 1;
    const size = 15;
    const orderBy = orderByEnum.ASC;
    const sortBy = "name";
    const countryId = "1";

    const returnedValue = await billingDataController.findBillingData(page, size, countryId, orderBy, sortBy, uid);
    expect(getBillingData).toHaveBeenCalled();
    expect(returnedValue).toEqual(expectedResult);
  });

  it('GET should return 403 when it cannnot retrieve data', async () => {
    const getBillingData = BillingDataService.prototype.getBillingData = jest.fn();
    getBillingData.mockImplementation(() => {
      throw new Error('error');
    });
    expect.assertions(3);

    const uid = '132';
    const page = 1;
    const size = 15;
    const orderBy = orderByEnum.ASC;
    const sortBy = "name";
    const countryId = "1";

    try {
      await billingDataController.findBillingData(page, size, countryId, orderBy, sortBy, uid);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('An error ocurred retrieving the data');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('GET should return 404 when it cannnot retrieve data', async () => {
    const getBillingData = BillingDataService.prototype.getBillingData = jest.fn();
    const expectedResult = mockBillingData.billingDataPaginatedOldVersion[0];
    expectedResult.data = [];
    expectedResult.size = 1;
    expectedResult.total = 1;
    expectedResult.page = 1;
    getBillingData.mockReturnValue({
      items: [],
      meta: {
        totalItems: 1,
        itemsPerPage: 1,
        currentPage: 1
      }
    });

    const uid = '132';
    const page = 1;
    const size = 15;
    const orderBy = orderByEnum.ASC;
    const sortBy = "name";
    const countryId = "1";

    const returnedValue = await billingDataController.findBillingData(page, size, countryId, orderBy, sortBy, uid);
    expect(returnedValue).toEqual(expectedResult);
  });

  it('GET should return 200 when get billing data is OK', async () => {
    const getBillingData = BillingDataService.prototype.getBillingData = jest.fn();
    getBillingData.mockReturnValue(mockBillingData.billindDataPaginated[0]);
    const expectedResult = mockBillingData.billindDataPaginated[0];
    const uid = '132';
    const page = 1;
    const size = 15;
    const orderBy = orderByEnum.ASC;
    const sortBy = "name";
    const countryId = "1";

    const returnedValue = await billingDataController.findBillingDataPaginated(page, size, countryId, orderBy, sortBy, uid);
    expect(getBillingData).toHaveBeenCalled();
    expect(returnedValue).toEqual(expectedResult);
  });

  it('GET should return 403 when it cannnot retrieve data', async () => {
    const getBillingData = BillingDataService.prototype.getBillingData = jest.fn();
    getBillingData.mockImplementation(() => {
      throw new Error('error');
    });
    expect.assertions(3);

    const uid = '132';
    const page = 1;
    const size = 15;
    const orderBy = orderByEnum.ASC;
    const sortBy = "name";
    const countryId = "1";

    try {
      await billingDataController.findBillingDataPaginated(page, size, countryId, orderBy, sortBy, uid);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('An error ocurred retrieving the data');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('GET should return 404 when it cannnot retrieve data', async () => {
    const getBillingData = BillingDataService.prototype.getBillingData = jest.fn();
    getBillingData.mockReturnValue({
      items: []
    });
    expect.assertions(3);

    const uid = '132';
    const page = 1;
    const size = 15;
    const orderBy = orderByEnum.ASC;
    const sortBy = "name";
    const countryId = "1";

    try {
      await billingDataController.findBillingDataPaginated(page, size, countryId, orderBy, sortBy, uid);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('No billing data for user with uid:');
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('PUT should return 200 when update billing is OK', async () => {
    const updateBillingDataById = BillingDataService.prototype.updateBillingDataById = jest.fn();
    updateBillingDataById.mockReturnValue(mockBillingData.billingDataEntity[0]);
    const expectedResult = mockBillingData.billingDataResponseOldVersion[0];
    const billingDataIdForUpdate = 1;

    const returnedValue = await billingDataController.update(billingDataIdForUpdate, mockBillingData.billingData[0]);

    expect(updateBillingDataById).toHaveBeenCalledWith(1, mockBillingData.billingData[0]);
    expect(returnedValue).toEqual(expectedResult);
  });

  it('PUT should return 403 when it cannnot update data', async () => {
    const updateBillingDataById = BillingDataService.prototype.updateBillingDataById = jest.fn();
    const billingDataIdForUpdate = 1;
    updateBillingDataById.mockImplementation(() => {
      throw new Error('error');
    });
    expect.assertions(3);

    try {
      await billingDataController.update(billingDataIdForUpdate, mockBillingData.billingData[0]);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('An error ocurred updating billing data');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('DELETE should return 200 when delete billing is OK', async () => {
    const deleteBillingDataById = BillingDataService.prototype.deleteBillingDataById = jest.fn();
    deleteBillingDataById.mockReturnValue(mockBillingData.billingDataDeleted[0]);
    const expectedResult = mockBillingData.billingDataDeleted[0];
    const billingDataIdForDelete = 1;

    const returnedValue = await billingDataController.delete(billingDataIdForDelete);

    expect(deleteBillingDataById).toHaveBeenCalledWith(1);
    expect(returnedValue).toEqual(expectedResult);
  });

  it('PUT should return 403 when it cannnot delete data', async () => {
    const deleteBillingDataById = BillingDataService.prototype.deleteBillingDataById = jest.fn();
    const billingDataIdForDelete = 1;
    deleteBillingDataById.mockImplementation(() => {
      throw new Error('error');
    });
    expect.assertions(3);

    try {
      await billingDataController.delete(billingDataIdForDelete);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('An error ocurred deleting billing data');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { BillingDataService } from '../../../src/billingData/billingData.service';
import { orderByEnum } from '../../../src/billingData/enums/order-by.enum';
import { BillingData } from '../../../src/entity/BillingData';
import { UserModule } from '../../../src/users/user.module';
import { UserService } from '../../../src/users/user.service';
import { EntityManagerWrapperService } from '../../../src/utils/entity-manager-wrapper.service';
import { mockBillingData } from '../../mock-billing-data';

jest.mock('../../../src/utils/entity-manager-wrapper.service');

describe('BillingDataService', () => {
  let billingDataService: BillingDataService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      providers: [BillingDataService]
    }).compile();

    billingDataService = module.get<BillingDataService>(BillingDataService);
  });

  it('should insert billing data in db', async () => {
    mockCreateBillingDataSuccessful();
    const returnedUser = mockFindUserByUid();
    const dataToCreate = mockBillingData.billingData[0];
    const billingData = new BillingData();
    Object.assign(billingData, mockBillingData.billingData[0]);
    billingData.userId = mockBillingData.users[0].id;

    const wrapperService = new EntityManagerWrapperService();
    const result = await billingDataService.create(dataToCreate, wrapperService);

    expect(result).toEqual(billingData);
    expect(result.userId).toEqual(mockBillingData.users[0].id);
    expect(returnedUser).toHaveBeenLastCalledWith(mockBillingData.users[0].uid, wrapperService);
  });

  it('should throw error when findUserByUid is emptyin create', async () => {
    mockFindUserByUidEmpty();
    const dataToCreate = mockBillingData.billingData[0];
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await billingDataService.create(dataToCreate, wrapperService);
    } catch (error) {
      expect(error.message).toContain('BillingData needs a VALID uid');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should throw error when create fails', async () => {
    mockCreateBillingDataFailure();
    const dataToCreate = mockBillingData.billingData[0];
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await billingDataService.create(dataToCreate, wrapperService);
    } catch (error) {
      expect(error.message).toContain('BillingData Database Error:');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return a billing data list by id', async () => {
    mockFindById();
    const billingDataId = 1;
    const expectedResult = mockBillingData.billingDataEntity[0];

    const wrapperService = new EntityManagerWrapperService();
    const result = await billingDataService.findBillingDataById(billingDataId, wrapperService);

    expect(result).toEqual(expectedResult);
  });

  it('should throw error when find by id fails', async () => {
    mockFindByIdFailure();
    const billingDataId = 1;
    const wrapperService = new EntityManagerWrapperService();

    try {
      await billingDataService.findBillingDataById(billingDataId, wrapperService);
    } catch (error) {
      expect(error.message).toContain('BillingDataById Find error:');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should update a billing data in db', async () => {
    mockUpdateBillingDataSuccessful();
    const returnedBillingData = mockFindBillingDataById();
    const dataToUpdate = mockBillingData.billingData[0];
    const expectedResult = new BillingData();
    Object.assign(expectedResult, mockBillingData.billingData[0]);
    const billingDataId = 1;

    const wrapperService = new EntityManagerWrapperService();
    const result = await billingDataService.updateBillingData(billingDataId, dataToUpdate, wrapperService);

    expect(result).toEqual(expectedResult);
    expect(returnedBillingData).toHaveBeenLastCalledWith(billingDataId, wrapperService);
  });

  it('should throw error when findBillingDataById is empty in update', async () => {
    mockFindBillingDataByIdEmpty();
    const dataToCreate = mockBillingData.billingData[0];
    const billingDataId = 1;
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await billingDataService.updateBillingData(billingDataId, dataToCreate, wrapperService);
    } catch (error) {
      expect(error.message).toContain('BillingData needs a VALID id');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should throw error when update fails', async () => {
    mockUpdateBillingDataFailure();
    const dataToCreate = mockBillingData.billingData[0];
    const billingDataId = 1;
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await billingDataService.updateBillingData(billingDataId, dataToCreate, wrapperService);
    } catch (error) {
      expect(error.message).toContain('Update Billing Data Database Error:');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return a billing data list by user uid', async () => {
    mockFindByUserUidReturnedValue();
    const uid = "132";
    const orderBy = orderByEnum.ASC;
    const sortBy = "name";
    const options = {
      page: 1,
      limit: 15,
      route: "http://host"
    }
    const expectedResult = mockBillingData.billindDataPaginated[0];

    const wrapperService = new EntityManagerWrapperService();
    const result = await billingDataService.findBillingData(uid, orderBy, sortBy, options, wrapperService);

    expect(result).toEqual(expectedResult);
  });

  it('should throw error when find ByUserUid fails', async () => {
    mockFindByUserUidFailure();
    const uid = "132";
    const orderBy = orderByEnum.ASC;
    const sortBy = "name";
    const options = {
      page: 1,
      limit: 15,
      route: "http://host"
    }
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await billingDataService.findBillingData(uid, orderBy, sortBy, options, wrapperService);
    } catch (error) {
      expect(error.message).toContain('BillingData Find error:');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should soft delete a billing data in db', async () => {
    mockDeleteBillingDataSuccessful();
    const returnedBillingData = mockFindBillingDataById();
    const expectedResult = mockBillingData.billingDataDeleted[0];
    const billingDataId = 1;

    const wrapperService = new EntityManagerWrapperService();
    const result = await billingDataService.deleteBillingData(billingDataId, wrapperService);

    expect(result).toEqual(expectedResult);
    expect(returnedBillingData).toHaveBeenLastCalledWith(billingDataId, wrapperService);
  });

  it('should throw error when findBillingDataById is empty in soft delete', async () => {
    mockFindBillingDataByIdEmpty();
    const billingDataId = 1;
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await billingDataService.deleteBillingData(billingDataId, wrapperService);
    } catch (error) {
      expect(error.message).toContain('BillingData needs a VALID id');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should throw error when delete fails', async () => {
    mockDeleteBillingDataFailure();
    const billingDataId = 1;
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await billingDataService.deleteBillingData(billingDataId, wrapperService);
    } catch (error) {
      expect(error.message).toContain('Delete Billing Data Database Error:');
      expect(error).toBeInstanceOf(Error);
    }
  });
});

const mockCreateBillingDataSuccessful = () => {
  const returnedBillingData = new BillingData();
  Object.assign(returnedBillingData, mockBillingData.billingData[0]);
  returnedBillingData.userId = mockBillingData.users[0].id;
  const save = EntityManagerWrapperService.prototype.save = jest.fn();
  save.mockReturnValue(returnedBillingData);
};

const mockFindUserByUid = () => {
  const findUserByUid = UserService.prototype.findUserByUid = jest.fn();
  return findUserByUid.mockReturnValue([mockBillingData.users[0]]);
};

const mockCreateBillingDataFailure = () => {
  const save = EntityManagerWrapperService.prototype.save = jest.fn();
  save.mockImplementation(() => { throw new Error('ANY.ERROR') });
};

const mockUpdateBillingDataFailure = () => {
  const save = EntityManagerWrapperService.prototype.save = jest.fn();
  save.mockImplementation(() => { throw new Error('ANY.ERROR') });
};

const mockFindUserByUidEmpty = () => {
  const findUserByUid = UserService.prototype.findUserByUid = jest.fn();
  return findUserByUid.mockReturnValue([]);
};

const mockUpdateBillingDataSuccessful = () => {
  const returnedBillingData = new BillingData();
  Object.assign(returnedBillingData, mockBillingData.billingData[0]);
  const save = EntityManagerWrapperService.prototype.save = jest.fn();
  save.mockReturnValue(returnedBillingData);
};

const mockFindBillingDataById = () => {
  const findBillingDataById = BillingDataService.prototype.findBillingDataById = jest.fn();
  return findBillingDataById.mockReturnValue([mockBillingData.billingDataEntity[0]]);
};

const mockFindBillingDataByIdEmpty = () => {
  const findBillingDataById = BillingDataService.prototype.findBillingDataById = jest.fn();
  return findBillingDataById.mockReturnValue([]);
};

const mockFindByUserUidReturnedValue = () => {
  const findBillingData = EntityManagerWrapperService.prototype.findBillingData = jest.fn();
  findBillingData.mockReturnValue(mockBillingData.billindDataPaginated[0]);
};

const mockFindByUserUidFailure = () => {
  const findBillingData = EntityManagerWrapperService.prototype.findBillingData = jest.fn();
  findBillingData.mockImplementation(() => { throw new Error('ANY.ERROR') });
};

const mockFindById = () => {
  const findBillingDataById = EntityManagerWrapperService.prototype.findBillingDataById = jest.fn();
  return findBillingDataById.mockReturnValue(mockBillingData.billingDataEntity[0]);
};

const mockFindByIdFailure = () => {
  const findBillingDataById = EntityManagerWrapperService.prototype.findBillingDataById = jest.fn();
  findBillingDataById.mockImplementation(() => { throw new Error('ANY.ERROR') });
};

const mockDeleteBillingDataSuccessful = () => {
  const deleteBillingData = EntityManagerWrapperService.prototype.deleteBillingData = jest.fn();
  return deleteBillingData.mockReturnValue(mockBillingData.billingDataDeleted[0]);
}

const mockDeleteBillingDataFailure = () => {
  const deleteBillingData = EntityManagerWrapperService.prototype.deleteBillingData = jest.fn();
  deleteBillingData.mockImplementation(() => { throw new Error('ANY.ERROR') });
};
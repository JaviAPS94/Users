import { Test, TestingModule } from '@nestjs/testing';
import { orderByEnum } from '../../../src/billingData/enums/order-by.enum';
import { ShippingAddress } from '../../../src/entity/ShippingAddress';
import { ShippingAddressService } from '../../../src/shippingAddress/shippingAddress.service';
import { UserModule } from '../../../src/users/user.module';
import { UserService } from '../../../src/users/user.service';
import { EntityManagerWrapperService } from '../../../src/utils/entity-manager-wrapper.service';
import { mockShippingAddress } from '../../../test/mock-shipping-address';
import { mockBillingData } from '../../mock-billing-data';

jest.mock('../../../src/utils/entity-manager-wrapper.service');

describe('ShippingAddressService', () => {
  let shippingAddressService: ShippingAddressService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      providers: [ShippingAddressService]
    }).compile();

    shippingAddressService = module.get<ShippingAddressService>(ShippingAddressService);
  });

  it('should insert shipping address in db', async () => {
    mockCreateShippingAddressSuccessful();
    const returnedUser = mockFindUserByUid();
    const dataToCreate = mockShippingAddress.shippingAddress[0];
    const shippingAddress = new ShippingAddress();
    Object.assign(shippingAddress, mockShippingAddress.shippingAddress[0]);
    shippingAddress.userId = mockShippingAddress.users[0].id;

    const wrapperService = new EntityManagerWrapperService();
    const result = await shippingAddressService.create(dataToCreate, wrapperService);

    expect(result).toEqual(shippingAddress);
    expect(result.userId).toEqual(mockShippingAddress.users[0].id);
    expect(returnedUser).toHaveBeenLastCalledWith(mockShippingAddress.users[0].uid, wrapperService);
  });

  it('should throw error when findUserByUid is empty in create', async () => {
    mockFindUserByUidEmpty();
    const dataToCreate = mockShippingAddress.shippingAddress[0];
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await shippingAddressService.create(dataToCreate, wrapperService);
    } catch (error) {
      expect(error.message).toContain('ShippingAddress needs a VALID uid');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should throw error when create fails', async () => {
    mockCreateShippingAddressFailure();
    const dataToCreate = mockShippingAddress.shippingAddress[0];
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await shippingAddressService.create(dataToCreate, wrapperService);
    } catch (error) {
      expect(error.message).toContain('ShippingAddress Database Error:');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return a shipping address by id', async () => {
    mockFindById();
    const shippingAddressId = 1;
    const expectedResult = mockShippingAddress.shippingAddressEntity[0];

    const wrapperService = new EntityManagerWrapperService();
    const result = await shippingAddressService.findShippingAddressById(shippingAddressId, wrapperService);

    expect(result).toEqual(expectedResult);
  });

  it('should throw error when find by id fails', async () => {
    mockFindByIdFailure();
    const shippingAddressId = 1;
    const wrapperService = new EntityManagerWrapperService();

    try {
      await shippingAddressService.findShippingAddressById(shippingAddressId, wrapperService);
    } catch (error) {
      expect(error.message).toContain('ShippingAddressById Find error:');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should update a shipping address in db', async () => {
    mockUpdateShippingAddressSuccessful();
    const returnedShippingAddress = mockFindShippingAddressById();
    const dataToUpdate = mockShippingAddress.shippingAddress[0];
    const expectedResult = new ShippingAddress();
    Object.assign(expectedResult, mockShippingAddress.shippingAddress[0]);
    const shippingAddressId = 1;

    const wrapperService = new EntityManagerWrapperService();
    const result = await shippingAddressService.updateShippingAddress(shippingAddressId, dataToUpdate, wrapperService);

    expect(result).toEqual(expectedResult);
    expect(returnedShippingAddress).toHaveBeenLastCalledWith(shippingAddressId, wrapperService);
  });

  it('should throw error when findBillingDataById is empty in update', async () => {
    mockFindShippingAddressByIdEmpty();
    const dataToUpdate = mockShippingAddress.shippingAddress[0];
    const shippingAddressId = 1;
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await shippingAddressService.updateShippingAddress(shippingAddressId, dataToUpdate, wrapperService);
    } catch (error) {
      expect(error.message).toContain('ShippingAddress needs a VALID id');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should throw error when update fails', async () => {
    mockUpdateShippingAddressFailure();
    const dataToUpdate = mockShippingAddress.shippingAddress[0];
    const shippingAddressId = 1;
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await shippingAddressService.updateShippingAddress(shippingAddressId, dataToUpdate, wrapperService);
    } catch (error) {
      expect(error.message).toContain('Update ShippingAddress Database Error:');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return a shipping address list by user uid', async () => {
    mockFindByUserUidReturnedValue();
    const uid = "132";
    const orderBy = orderByEnum.ASC;
    const sortBy = "nickname";
    const options = {
      page: 1,
      limit: 15,
      route: "http://host"
    }
    const expectedResult = mockShippingAddress.shippingAddressPaginated[0];

    const wrapperService = new EntityManagerWrapperService();
    const result = await shippingAddressService.findShippingAddress(uid, orderBy, sortBy, options, wrapperService);

    expect(result).toEqual(expectedResult);
  });

  it('should throw error when find shipping address by user uid fails', async () => {
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
      await shippingAddressService.findShippingAddress(uid, orderBy, sortBy, options, wrapperService);
    } catch (error) {
      expect(error.message).toContain('ShippingAddress Find error:');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should soft delete a shipping address in db', async () => {
    mockDeleteShippingAddressSuccessful();
    const returnedShippingAddress = mockFindShippingAddressById();
    const expectedResult = mockShippingAddress.shippingAddressDeleted[0];
    const shippingAddressId = 1;

    const wrapperService = new EntityManagerWrapperService();
    const result = await shippingAddressService.deleteShippingAddress(shippingAddressId, wrapperService);

    expect(result).toEqual(expectedResult);
    expect(returnedShippingAddress).toHaveBeenLastCalledWith(shippingAddressId, wrapperService);
  });

  it('should throw error when findShippingAddressById is empty in soft delete', async () => {
    mockFindShippingAddressByIdEmpty();
    const shippingAddressId = 1;
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await shippingAddressService.deleteShippingAddress(shippingAddressId, wrapperService);
    } catch (error) {
      expect(error.message).toContain('ShippingAddress needs a VALID id');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should throw error when delete fails', async () => {
    mockDeleteShippingAddressFailure();
    const shippingAddressId = 1;
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await shippingAddressService.deleteShippingAddress(shippingAddressId, wrapperService);
    } catch (error) {
      expect(error.message).toContain('Delete Shipping Address Database Error:');
      expect(error).toBeInstanceOf(Error);
    }
  });
});

const mockCreateShippingAddressSuccessful = () => {
  const returnedShippingAddress = new ShippingAddress();
  Object.assign(returnedShippingAddress, mockShippingAddress.shippingAddress[0]);
  returnedShippingAddress.userId = mockBillingData.users[0].id;
  const save = EntityManagerWrapperService.prototype.save = jest.fn();
  save.mockReturnValue(returnedShippingAddress);
};

const mockFindUserByUid = () => {
  const findUserByUid = UserService.prototype.findUserByUid = jest.fn();
  return findUserByUid.mockReturnValue([mockBillingData.users[0]]);
};

const mockCreateShippingAddressFailure = () => {
  const save = EntityManagerWrapperService.prototype.save = jest.fn();
  save.mockImplementation(() => { throw new Error('ANY.ERROR') });
};

const mockFindUserByUidEmpty = () => {
  const findUserByUid = UserService.prototype.findUserByUid = jest.fn();
  return findUserByUid.mockReturnValue([]);
};

const mockFindById = () => {
  const findShippingAddressById = EntityManagerWrapperService.prototype.findShippingAddressById = jest.fn();
  return findShippingAddressById.mockReturnValue(mockShippingAddress.shippingAddressEntity[0]);
};

const mockFindByIdFailure = () => {
  const findShippingAddressById = EntityManagerWrapperService.prototype.findShippingAddressById = jest.fn();
  findShippingAddressById.mockImplementation(() => { throw new Error('ANY.ERROR') });
};

const mockUpdateShippingAddressSuccessful = () => {
  const returnedShippingAddress = new ShippingAddress();
  Object.assign(returnedShippingAddress, mockShippingAddress.shippingAddress[0]);
  const save = EntityManagerWrapperService.prototype.save = jest.fn();
  save.mockReturnValue(returnedShippingAddress);
};

const mockFindShippingAddressById = () => {
  const findShippingAddressById = ShippingAddressService.prototype.findShippingAddressById = jest.fn();
  return findShippingAddressById.mockReturnValue([mockShippingAddress.shippingAddressEntity[0]]);
};

const mockFindShippingAddressByIdEmpty = () => {
  const findShippingAddressById = ShippingAddressService.prototype.findShippingAddressById = jest.fn();
  return findShippingAddressById.mockReturnValue([]);
};

const mockUpdateShippingAddressFailure = () => {
  const save = EntityManagerWrapperService.prototype.save = jest.fn();
  save.mockImplementation(() => { throw new Error('ANY.ERROR') });
};

const mockFindByUserUidReturnedValue = () => {
  const findShippingAddress = EntityManagerWrapperService.prototype.findShippingAddress = jest.fn();
  findShippingAddress.mockReturnValue(mockShippingAddress.shippingAddressPaginated[0]);
};

const mockFindByUserUidFailure = () => {
  const findShippingAddress = EntityManagerWrapperService.prototype.findShippingAddress = jest.fn();
  findShippingAddress.mockImplementation(() => { throw new Error('ANY.ERROR') });
};

const mockDeleteShippingAddressSuccessful = () => {
  const deleteShippingAddress = EntityManagerWrapperService.prototype.deleteShippingAddress = jest.fn();
  return deleteShippingAddress.mockReturnValue(mockShippingAddress.shippingAddressDeleted[0]);
}

const mockDeleteShippingAddressFailure = () => {
  const deleteShippingAddress = EntityManagerWrapperService.prototype.deleteShippingAddress = jest.fn();
  deleteShippingAddress.mockImplementation(() => { throw new Error('ANY.ERROR') });
};
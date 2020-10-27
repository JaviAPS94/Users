import { Test, TestingModule } from '@nestjs/testing';
import { Connection, QueryRunner } from 'typeorm';
import { User } from '../../../src/entity/User';
import { DynamicFilterDto } from '../../../src/users/dto/dynamic-filter.dto';
import { FindUserBillingShippingDto } from '../../../src/users/dto/find-user-billing-shipping.dto';
import UserTransformer from '../../../src/users/transformers/user.transformer';
import { UserService } from '../../../src/users/user.service';
import { EntityManagerWrapperService } from '../../../src/utils/entity-manager-wrapper.service';
import { mockBillingData } from '../../../test/mock-billing-data';
import { mockShippingAddress } from '../../../test/mock-shipping-address';
import { mockUser } from '../../../test/mock-user';

jest.mock('../../../src/utils/entity-manager-wrapper.service');

describe('UserService', () => {
  let userService: UserService;
  let connection: Connection;

  const qr = {
    manager: {},
  } as QueryRunner;

  class ConnectionMock {
    createQueryRunner(mode?: "master" | "slave"): QueryRunner {
      return qr;
    }
  }

  beforeEach(async () => {
    Object.assign(qr.manager, {
      save: jest.fn()
    });
    qr.connect = jest.fn();
    qr.release = jest.fn();
    qr.startTransaction = jest.fn();
    qr.commitTransaction = jest.fn();
    qr.rollbackTransaction = jest.fn();
    qr.manager.findOne  = jest.fn().mockReturnValue(mockUser.entityUsers[0]);
    qr.release = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserTransformer, Connection,
        {
          provide: Connection,
          useClass: ConnectionMock,
        }
      ]
    }).compile();

    userService = module.get<UserService>(UserService);
    connection = await module.get<Connection>(Connection);
  });

  it('should insert user in db', async () => {
    mockCreateUserSuccessful();
    const dataToCreate = mockUser.users[0];
    const expectedResult = mockUser.userAndDocument[0];

    const queryRunner = connection.createQueryRunner();
   
    jest.spyOn(queryRunner.manager, 'save').mockResolvedValueOnce(mockUser.userAndDocument[0].userReturned);
    jest.spyOn(queryRunner.manager, 'save').mockResolvedValueOnce(mockUser.entityDocument[0]);

    const result = await userService.create(dataToCreate, queryRunner);
    expect(result).toEqual(expectedResult);
  });

  it('should throw error when create fails', async () => {
    mockCreateUserFailure();
    const dataToCreate = mockUser.users[0];
    expect.assertions(2);

    try {
      await userService.create(dataToCreate, connection.createQueryRunner());
    } catch (error) {
      expect(error.message).toContain('User Database Error:');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return a user by uid and country', async () => {
    mockFindUserByUidAndCountry();
    const userUid = "test";
    const countryId = 1;
    const expectedResult = mockUser.entityUsers[0];

    const wrapperService = new EntityManagerWrapperService();
    const result = await userService.findUserByUidAndCountry(userUid, countryId, wrapperService);

    expect(result).toEqual(expectedResult);
  });

  it('should throw error when find user by uid and country fails', async () => {
    mockFindUserByUidAndCountryFailure();
    const userUid = "test";
    const countryId = 1;
    const wrapperService = new EntityManagerWrapperService();

    try {
      await userService.findUserByUidAndCountry(userUid, countryId, wrapperService);
    } catch (error) {
      expect(error.message).toContain('UserByUidAndCountry Find error:');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return a user by uid', async () => {
    mockFindUserByUid();
    const userUid = "test";
    const expectedResult = mockUser.entityUsers[0];

    const wrapperService = new EntityManagerWrapperService();
    const result = await userService.findUserByUid(userUid, wrapperService);

    expect(result).toEqual(expectedResult);
  });

  it('should throw error when find user by uid fails', async () => {
    mockFindUserByUidFailure();
    const userUid = "test";
    const wrapperService = new EntityManagerWrapperService();

    try {
      await userService.findUserByUid(userUid, wrapperService);
    } catch (error) {
      expect(error.message).toContain('UserByUid Find error:');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should update a user in db', async () => {
    const dataToCreate = mockUser.users[0];
    const expectedResult = mockUser.userAndDocument[0];

    const queryRunner = connection.createQueryRunner();
    jest.spyOn(queryRunner.manager, 'save').mockResolvedValueOnce(mockUser.userAndDocument[0].userReturned);
    jest.spyOn(queryRunner.manager, 'save').mockResolvedValueOnce(mockUser.entityDocument[0]);

    const result = await userService.update(dataToCreate, queryRunner);
    expect(result).toEqual(expectedResult);
  });

  it('should throw error when update fails', async () => {
    const dataToUpdate = mockUser.users[0];
    expect.assertions(2);

    try {
      await userService.update(dataToUpdate, connection.createQueryRunner());
    } catch (error) {
      expect(error.message).toContain('User Database Error');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return user code', async () => {
    const firstName = "FirstNameTest";
    const lastName = "LastNameTest";
    const uid = "test";
    const expectedResult = "FIRLASTEST"

    const result = await userService.generateUserCode(firstName, lastName, uid);

    expect(result).toEqual(expectedResult);
  });

  it('should return a user dynamic filter', async () => {
    mockFindUserByDynamicFilter();
    const expectedResult = mockUser.entityUsers[0];

    const dynamicFilterDto: DynamicFilterDto = {
      name: "name",
      value: "test",
      account: 1,
      countryId: 1
    };

    const wrapperService = new EntityManagerWrapperService();
    const result = await userService.findUserByDynamicFilter(dynamicFilterDto, wrapperService);

    expect(result).toEqual(expectedResult);
  });

  it('should throw error when find user by dynamic filter fails', async () => {
    mockFindUserByDynamicFilterFailure();
    const dynamicFilterDto: DynamicFilterDto = {
      name: "name",
      value: "test",
      account: 1,
      countryId: 1
    };
    const wrapperService = new EntityManagerWrapperService();

    try {
      await userService.findUserByDynamicFilter(dynamicFilterDto, wrapperService);
    } catch (error) {
      expect(error.message).toContain('UserByDynamicFilter Find error:');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return a user by uid with shipping and billing', async () => {
    mockFindUserByUidWithShippingAndBilling();
    mockFindBillingDataById();
    mockFindShippingAddressById();
    const expectedResult = mockUser.usersWithShippingAndBilling[0];

    const uid = "test";
    const findUserBillingShippingDto: FindUserBillingShippingDto = {
      shipping: "1",
      billing: "1",
      countryId: "1"
    }

    const wrapperService = new EntityManagerWrapperService();
    const result = await userService.findUserByUidWithShippingAndBilling(uid, findUserBillingShippingDto, wrapperService);

    expect(result).toEqual(expectedResult);
  });

  it('should throw error when find user by uid with shipping and billing fails', async () => {
    mockFindUserByUidWithShippingAndBillingFailure();
    mockFindBillingDataById();
    mockFindShippingAddressById();
    const uid = "test";
    const findUserBillingShippingDto: FindUserBillingShippingDto = {
      shipping: "1",
      billing: "1",
      countryId: "1"
    }
    const wrapperService = new EntityManagerWrapperService();

    try {
      await userService.findUserByUidWithShippingAndBilling(uid, findUserBillingShippingDto, wrapperService);
    } catch (error) {
      expect(error.message).toContain('UserByUidWithBillingAndShipping Find error:');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should throw error when find user by uid with shipping and billing fails by empty billing data', async () => {
    mockFindBillingDataByIdEmpty();
    const uid = "test";
    const findUserBillingShippingDto: FindUserBillingShippingDto = {
      shipping: "1",
      billing: "1",
      countryId: "1"
    }
    const wrapperService = new EntityManagerWrapperService();

    try {
      await userService.findUserByUidWithShippingAndBilling(uid, findUserBillingShippingDto, wrapperService);
    } catch (error) {
      expect(error.message).toContain('FindUserByUidAndDocumentByCountry needs a VALID billing id');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should throw error when find user by uid with shipping and billing fails by empty shipping address', async () => {
    mockFindBillingDataById();
    mockFindShippingAddressByIdEmpty();
    const uid = "test";
    const findUserBillingShippingDto: FindUserBillingShippingDto = {
      shipping: "1",
      billing: "1",
      countryId: "1"
    }
    const wrapperService = new EntityManagerWrapperService();

    try {
      await userService.findUserByUidWithShippingAndBilling(uid, findUserBillingShippingDto, wrapperService);
    } catch (error) {
      expect(error.message).toContain('FindUserByUidAndDocumentByCountry needs a VALID shipping address id');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should throw error when find user by uid with shipping and billing fails by empty user', async () => {
    mockFindBillingDataById();
    mockFindShippingAddressById();
    mockFindUserByUidWithShippingAndBillingEmpty();
    const uid = "test";
    const findUserBillingShippingDto: FindUserBillingShippingDto = {
      shipping: "1",
      billing: "1",
      countryId: "1"
    }
    const wrapperService = new EntityManagerWrapperService();

    try {
      await userService.findUserByUidWithShippingAndBilling(uid, findUserBillingShippingDto, wrapperService);
    } catch (error) {
      expect(error.message).toContain('FindUserByUidAndDocumentByCountry needs a VALID uid');
      expect(error).toBeInstanceOf(Error);
    }
  });
});

const mockCreateUserSuccessful = () => {
  const returnedUser = new User();
  Object.assign(returnedUser, mockUser.users[0]);
  const save = EntityManagerWrapperService.prototype.save = jest.fn();
  save.mockReturnValue(returnedUser);
};

const mockCreateUserFailure = () => {
  const save = EntityManagerWrapperService.prototype.save = jest.fn();
  save.mockImplementation(() => { throw new Error('ANY.ERROR') });
};

const mockFindUserByUid = () => {
  const findUserByUid = EntityManagerWrapperService.prototype.findUserByUid = jest.fn();
  return findUserByUid.mockReturnValue(mockUser.entityUsers[0]);
};

const mockFindUserByUidFailure = () => {
  const findUserByUid = EntityManagerWrapperService.prototype.findUserByUid = jest.fn();
  findUserByUid.mockImplementation(() => { throw new Error('ANY.ERROR') });
};

const mockFindUserByUidAndCountry = () => {
  const findUserByUidAndCountry = EntityManagerWrapperService.prototype.findUserByUidAndCountry = jest.fn();
  return findUserByUidAndCountry.mockReturnValue(mockUser.entityUsers[0]);
};

const mockFindUserByUidAndCountryFailure = () => {
  const findUserByUidAndCountry = EntityManagerWrapperService.prototype.findUserByUidAndCountry = jest.fn();
  findUserByUidAndCountry.mockImplementation(() => { throw new Error('ANY.ERROR') });
};

const mockFindUserByDynamicFilter = () => {
  const findUserByDynamicFilter = EntityManagerWrapperService.prototype.findUserByDynamicFilter = jest.fn();
  return findUserByDynamicFilter.mockReturnValue(mockUser.entityUsers[0]);
};

const mockFindUserByDynamicFilterFailure = () => {
  const findUserByDynamicFilter = EntityManagerWrapperService.prototype.findUserByDynamicFilter = jest.fn();
  findUserByDynamicFilter.mockImplementation(() => { throw new Error('ANY.ERROR') });
};

const mockFindUserByUidWithShippingAndBilling = () => {
  const findUserByUidWithShippingAndBilling = EntityManagerWrapperService.prototype.findUserByUidWithShippingAndBilling = jest.fn();
  return findUserByUidWithShippingAndBilling.mockReturnValue(mockUser.usersWithShippingAndBilling[0]);
};

const mockFindUserByUidWithShippingAndBillingFailure = () => {
  const findUserByUidWithShippingAndBilling = EntityManagerWrapperService.prototype.findUserByUidWithShippingAndBilling = jest.fn();
  return findUserByUidWithShippingAndBilling.mockImplementation(() => { throw new Error('ANY.ERROR') });
};

const mockFindBillingDataById = () => {
  const findBillingDataById = EntityManagerWrapperService.prototype.findBillingDataById = jest.fn();
  return findBillingDataById.mockReturnValue(mockBillingData.billingDataEntity[0]);
}

const mockFindBillingDataByIdEmpty = () => {
  const findBillingDataById = EntityManagerWrapperService.prototype.findBillingDataById = jest.fn();
  return findBillingDataById.mockReturnValue(undefined);
}

const mockFindShippingAddressByIdEmpty = () => {
  const findShippingAddressById = EntityManagerWrapperService.prototype.findShippingAddressById = jest.fn();
  return findShippingAddressById.mockReturnValue(undefined);
}

const mockFindUserByUidWithShippingAndBillingEmpty = () => {
  const findUserByUidWithShippingAndBilling = EntityManagerWrapperService.prototype.findUserByUidWithShippingAndBilling = jest.fn();
  return findUserByUidWithShippingAndBilling.mockReturnValue(undefined);
}

const mockFindShippingAddressById = () => {
  const findShippingAddressById = EntityManagerWrapperService.prototype.findShippingAddressById = jest.fn();
  return findShippingAddressById.mockReturnValue(mockShippingAddress.shippingAddressEntity[0]);
}

const mockUpdateUserSuccessful = () => {
  const returnedUser = new User();
  Object.assign(returnedUser, mockUser.users[0]);
  const save = EntityManagerWrapperService.prototype.save = jest.fn();
  save.mockReturnValue(returnedUser);
};

const mockFindUserByUidService = () => {
  const findUserByUid = UserService.prototype.findUserByUid = jest.fn();
  return findUserByUid.mockReturnValue([mockUser.entityUsers[0]]);
};

const mockFindUserByUidEmpty = () => {
  const findUserByUid = UserService.prototype.findUserByUid = jest.fn();
  return findUserByUid.mockReturnValue([]);
};

const mockUpdateUserFailure = () => {
  const save = EntityManagerWrapperService.prototype.save = jest.fn();
  save.mockImplementation(() => { throw new Error('ANY.ERROR') });
};
import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DynamicFilterDto } from '../../../src/users/dto/dynamic-filter.dto';
import { FindUserBillingShippingDto } from '../../../src/users/dto/find-user-billing-shipping.dto';
import { FindUserDto } from '../../../src/users/dto/find-user.dto';
import { UserDto } from '../../../src/users/dto/user.dto';
import { UserTransformer } from '../../../src/users/transformers/user.transformer';
import { UserController } from '../../../src/users/user.controller';
import { UserService } from '../../../src/users/user.service';
import { mockUser } from '../../../test/mock-user';

describe('User Controller', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserTransformer]
    }).compile();
    userController = module.get<UserController>(UserController);
  });

  it('POST should return 201 when post data is Ok', async () => {
    const createUser = UserService.prototype.saveUser = jest.fn();
    createUser.mockReturnValue(mockUser.userAndDocument[0]);

    const userDto = new UserDto();
    Object.assign(userDto, mockUser.users[0]);
    const returnedValue = await userController.create(userDto);
    expect(createUser).toHaveBeenCalled();
    expect(returnedValue).toEqual(mockUser.createUsers[0]);
  });

  it('POST should return 403 when data to post is invalid', async () => {
    const createUser = UserService.prototype.saveUser = jest.fn();
    createUser.mockImplementation(() => {
      throw new Error('error');
    });
    const userDto = new UserDto();
    Object.assign(userDto, mockUser.users[0]);

    expect.assertions(3);

    try {
      await userController.create(userDto);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('The input data is invalid');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('PUT should return 200 when update user is OK', async () => {
    const updateUser = UserService.prototype.updateUser = jest.fn();
    updateUser.mockReturnValue(mockUser.userAndDocumentUpdate[0]);
    const expectedResult = mockUser.updateUsers[0];

    const returnedValue = await userController.update(mockUser.users[0]);

    expect(updateUser).toHaveBeenCalled();
    expect(returnedValue).toEqual(expectedResult);
  });

  it('PUT should return 403 when it cannnot update data', async () => {
    const updateUser = UserService.prototype.updateUser = jest.fn();
    updateUser.mockImplementation(() => {
      throw new Error('error');
    });
    expect.assertions(3);

    try {
      await userController.update(mockUser.users[0]);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('The input data is invalid');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('GET should return 200 when get user is OK', async () => {
    const getUser = UserService.prototype.getUser = jest.fn();
    getUser.mockReturnValue(mockUser.entityUsersWithDocument[0]);
    const expectedResult = mockUser.userResponseOldVersion[0];
    const uid = '132';
    const account = 1;
    const countryId = 1;

    const returnedValue = await userController.find(uid, account, countryId);
    expect(getUser).toHaveBeenCalled();
    expect(returnedValue).toEqual(expectedResult);
  });

  it('GET should return 403 when it cannnot retrieve data', async () => {
    const getUser = UserService.prototype.getUser = jest.fn();
    getUser.mockImplementation(() => {
      throw new Error('error');
    });
    expect.assertions(3);

    const uid = '132';
    const account = 1;
    const countryId = 1;

    try {
      await userController.find(uid, account, countryId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('An error ocurred retrieving the data');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('GET should return 404 when it cannnot retrieve data', async () => {
    const getUser = UserService.prototype.getUser = jest.fn();
    getUser.mockReturnValue(undefined);
    expect.assertions(3);

    const uid = '132';
    const account = 1;
    const countryId = 1;

    try {
      await userController.find(uid, account, countryId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('No user for uid:');
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('POST should return 200 when get user is OK in findUser EP', async () => {
    const getUsersByDynamicFilter = UserService.prototype.getUsersByDynamicFilter = jest.fn();
    getUsersByDynamicFilter.mockReturnValue(mockUser.usersInFindUserEP);
    const expectedResult = mockUser.userResponseOldVersion[0];
    const findUserDto: FindUserDto = {
      parameter: {
        name: "test",
        value: "test",
      },
      account: 1,
      countryId: 1
    };

    const returnedValue = await userController.findUsers(findUserDto);
    expect(getUsersByDynamicFilter).toHaveBeenCalled();
    expect(returnedValue).toEqual(expectedResult);
  });

  it('POST should return 403 when it cannnot retrieve data in findUser EP', async () => {
    const getUsersByDynamicFilter = UserService.prototype.getUsersByDynamicFilter = jest.fn();
    getUsersByDynamicFilter.mockImplementation(() => {
      throw new Error('error');
    });
    expect.assertions(3);

    const findUserDto: FindUserDto = {
      parameter: {
        name: "test",
        value: "test",
      },
      account: 1,
      countryId: 1
    };

    try {
      await userController.findUsers(findUserDto);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('An error ocurred retrieving the data');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('POST should return 404 when it cannnot retrieve data in findUser EP', async () => {
    const getUsersByDynamicFilter = UserService.prototype.getUsersByDynamicFilter = jest.fn();
    getUsersByDynamicFilter.mockReturnValue([]);
    expect.assertions(3);

    const findUserDto: FindUserDto = {
      parameter: {
        name: "test",
        value: "test",
      },
      account: 1,
      countryId: 1
    };

    try {
      await userController.findUsers(findUserDto);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('No users for this filters');
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('GET should return 200 when get user is OK in findUsersByDynamicFilter EP', async () => {
    const getUsersByDynamicFilter = UserService.prototype.getUsersByDynamicFilter = jest.fn();
    getUsersByDynamicFilter.mockReturnValue(mockUser.entityUsers);
    const expectedResult = mockUser.entityUsers;
    const dynamicFilterDto: DynamicFilterDto = {
      name: "test",
      value: "test",
      account: 1,
      countryId: 1
    };

    const returnedValue = await userController.findUsersByDynamicFilter(dynamicFilterDto);
    expect(getUsersByDynamicFilter).toHaveBeenCalled();
    expect(returnedValue).toEqual(expectedResult);
  });

  it('GET should return 403 when it cannnot retrieve data in findUsersByDynamicFilter EP', async () => {
    const getUsersByDynamicFilter = UserService.prototype.getUsersByDynamicFilter = jest.fn();
    getUsersByDynamicFilter.mockImplementation(() => {
      throw new Error('error');
    });
    expect.assertions(3);

    const dynamicFilterDto: DynamicFilterDto = {
      name: "test",
      value: "test",
      account: 1,
      countryId: 1
    };

    try {
      await userController.findUsersByDynamicFilter(dynamicFilterDto);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('An error ocurred retrieving the data');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('GET should return 404 when it cannnot retrieve data in findUsersByDynamicFilter EP', async () => {
    const getUsersByDynamicFilter = UserService.prototype.getUsersByDynamicFilter = jest.fn();
    getUsersByDynamicFilter.mockReturnValue([]);
    expect.assertions(3);

    const dynamicFilterDto: DynamicFilterDto = {
      name: "test",
      value: "test",
      account: 1,
      countryId: 1
    };

    try {
      await userController.findUsersByDynamicFilter(dynamicFilterDto);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('No users for this filters');
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('GET should return 200 when get user is OK in findUserByUidWithBillingAndShipping EP', async () => {
    const getUserWithBillingAndShipping = UserService.prototype.getUserWithBillingAndShipping = jest.fn();
    getUserWithBillingAndShipping.mockReturnValue(mockUser.usersWithShippingAndBilling[0]);
    const expectedResult = mockUser.usersWithShippingAndBillingResponse[0];
    const uid = "test";
    const findUserBillingShippingDto: FindUserBillingShippingDto = {
      billing: "1",
      shipping: "1",
      countryId: "1"
    };

    const returnedValue = await userController.findUserByUidWithBillingAndShipping(uid, findUserBillingShippingDto);
    expect(getUserWithBillingAndShipping).toHaveBeenCalled();
    expect(returnedValue).toEqual(expectedResult);
  });

  it('GET should return 403 when it cannnot retrieve data in findUserByUidWithBillingAndShipping EP', async () => {
    const getUserWithBillingAndShipping = UserService.prototype.getUserWithBillingAndShipping = jest.fn();
    getUserWithBillingAndShipping.mockImplementation(() => {
      throw new Error('error');
    });
    expect.assertions(3);

    const uid = "test";
    const findUserBillingShippingDto: FindUserBillingShippingDto = {
      billing: "1",
      shipping: "1",
      countryId: "1"
    };

    try {
      await userController.findUserByUidWithBillingAndShipping(uid, findUserBillingShippingDto);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('An error ocurred retrieving the data');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('GET should return 404 when it cannnot retrieve data in findUserByUidWithBillingAndShipping EP', async () => {
    const getUserWithBillingAndShipping = UserService.prototype.getUserWithBillingAndShipping = jest.fn();
    getUserWithBillingAndShipping.mockReturnValue(undefined);
    expect.assertions(3);

    const uid = "test";
    const findUserBillingShippingDto: FindUserBillingShippingDto = {
      billing: "1",
      shipping: "1",
      countryId: "1"
    };

    try {
      await userController.findUserByUidWithBillingAndShipping(uid, findUserBillingShippingDto);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('No users with billing and shipping for this uid:');
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    }
  });
});
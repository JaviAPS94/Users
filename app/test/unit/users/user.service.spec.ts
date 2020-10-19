import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../../src/entity/User';
import { UserService } from '../../../src/users/user.service';
import { EntityManagerWrapperService } from '../../../src/utils/entity-manager-wrapper.service';
import { mockUser } from '../../../test/mock-user';

jest.mock('../../../src/utils/entity-manager-wrapper.service');

describe('UserService', () => {
  let userService: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService]
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should insert user in db', async () => {
    mockCreateUserSuccessful();
    const dataToCreate = mockUser.users[0];
    const user = new User();
    Object.assign(user, mockUser.users[0]);

    const wrapperService = new EntityManagerWrapperService();
    const result = await userService.create(dataToCreate, wrapperService);

    expect(result).toEqual(user);
  });

  it('should throw error when create fails', async () => {
    mockCreateUserFailure();
    const dataToCreate = mockUser.users[0];
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await userService.create(dataToCreate, wrapperService);
    } catch (error) {
      expect(error.message).toContain('User Database Error:');
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
    mockUpdateUserSuccessful();
    const returnedUser = mockFindUserByUidService();
    const dataToUpdate = mockUser.users[0];
    const expectedResult = new User();
    Object.assign(expectedResult, mockUser.entityUsers[0]);
    const userUid = "test";

    const wrapperService = new EntityManagerWrapperService();
    const result = await userService.update(dataToUpdate, wrapperService);

    expect(result).toEqual(expectedResult);
    expect(returnedUser).toHaveBeenLastCalledWith(userUid, wrapperService);
  });

  it('should throw error when findUserByUid is empty in update', async () => {
    mockFindUserByUidEmpty();
    const dataToCreate = mockUser.users[0];
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await userService.update(dataToCreate, wrapperService);
    } catch (error) {
      expect(error.message).toContain('User needs a VALID uid');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should throw error when update fails', async () => {
    mockUpdateUserFailure();
    const dataToUpdate = mockUser.users[0];
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await userService.update(dataToUpdate, wrapperService);
    } catch (error) {
      expect(error.message).toContain('Update User Database Error:');
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

const mockUpdateUserSuccessful = () => {
  const returnedUser = new User();
  Object.assign(returnedUser, mockUser.entityUsers[0]);
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
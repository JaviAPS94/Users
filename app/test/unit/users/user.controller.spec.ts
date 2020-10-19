import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from '../../../src/users/dto/user.dto';
import { UserController } from '../../../src/users/user.controller';
import { UserService } from '../../../src/users/user.service';
import { mockUser } from '../../../test/mock-user';

describe('User Controller', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    }).compile();
    userController = module.get<UserController>(UserController);
  });

  it('POST should return 201 when post data is Ok', async () => {
    const createUser = UserService.prototype.saveUser = jest.fn();
    createUser.mockReturnValue(mockUser.entityUsers[0]);
    const userDto = new UserDto();
    Object.assign(userDto, mockUser.users[0]);

    const returnedValue = await userController.create(userDto);
    expect(createUser).toHaveBeenCalled();
    expect(returnedValue).toEqual(mockUser.entityUsers[0]);
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
    updateUser.mockReturnValue(mockUser.entityUsers[0]);
    const expectedResult = mockUser.entityUsers[0];

    const returnedValue = await userController.update(mockUser.users[0]);

    expect(updateUser).toHaveBeenCalledWith(mockUser.users[0]);
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
});
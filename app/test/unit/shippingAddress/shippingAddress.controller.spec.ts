import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import ShippingAddressTransformer from '../../../src/shippingAddress/transformers/shippingAddress.transformer';
import { orderByEnum } from '../../../src/billingData/enums/order-by.enum';
import { ShippingAddressDto } from '../../../src/shippingAddress/dto/shipping-address.dto';
import { ShippingAddressController } from '../../../src/shippingAddress/shippingAddress.controller';
import { ShippingAddressService } from '../../../src/shippingAddress/shippingAddress.service';
import { UserModule } from '../../../src/users/user.module';
import { mockShippingAddress } from '../../../test/mock-shipping-address';

describe('ShippingAdress Controller', () => {
  let shippingAddressController: ShippingAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      controllers: [ShippingAddressController],
      providers: [ShippingAddressService, ShippingAddressTransformer]
    }).compile();
    shippingAddressController = module.get<ShippingAddressController>(ShippingAddressController);
  });

  it('POST should return 201 when post data is Ok', async () => {
    const createShippingAdress = ShippingAddressService.prototype.saveShippingAddress = jest.fn();
    createShippingAdress.mockReturnValue(mockShippingAddress.shippingAddressEntity[0]);
    const shippingAdressDto = new ShippingAddressDto();
    Object.assign(shippingAdressDto, mockShippingAddress.shippingAddress[0]);

    const returnedValue = await shippingAddressController.create(shippingAdressDto);
    expect(createShippingAdress).toHaveBeenCalled();
    expect(returnedValue).toEqual(mockShippingAddress.shippingAddressResponseOldVersion[0]);
  });

  it('POST should return 403 when data to post is invalid', async () => {
    const createShippingAdress = ShippingAddressService.prototype.saveShippingAddress = jest.fn();
    createShippingAdress.mockImplementation(() => {
      throw new Error('error');
    });
    const shippingAdressDto = new ShippingAddressDto();
    Object.assign(shippingAdressDto, mockShippingAddress.shippingAddress[0]);

    expect.assertions(3);

    try {
      await shippingAddressController.create(shippingAdressDto);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('The input data is invalid');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('PUT should return 200 when update shipping address is OK', async () => {
    const updateShippingAddressById = ShippingAddressService.prototype.updateShippingAddressById = jest.fn();
    updateShippingAddressById.mockReturnValue(mockShippingAddress.shippingAddressEntity[0]);
    const expectedResult = mockShippingAddress.shippingAddressEntity[0];
    const shippingAddressIdForUpdate = 1;

    const returnedValue = await shippingAddressController.update(shippingAddressIdForUpdate, mockShippingAddress.shippingAddress[0]);

    expect(updateShippingAddressById).toHaveBeenCalledWith(1, mockShippingAddress.shippingAddress[0]);
    expect(returnedValue).toEqual(expectedResult);
  });

  it('PUT should return 403 when it cannnot update data', async () => {
    const updateShippingAddressById = ShippingAddressService.prototype.updateShippingAddressById = jest.fn();
    const billingDataIdForUpdate = 1;
    updateShippingAddressById.mockImplementation(() => {
      throw new Error('error');
    });
    expect.assertions(3);

    try {
      await shippingAddressController.update(billingDataIdForUpdate, mockShippingAddress.shippingAddress[0]);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('An error ocurred updating shipping address');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('GET should return 200 when get shipping address is OK', async () => {
    const getShippingAddress = ShippingAddressService.prototype.getShippingAddress = jest.fn();
    getShippingAddress.mockReturnValue(mockShippingAddress.shippingAddressPaginated[0]);
    const expectedResult = mockShippingAddress.shippingAddressPaginatedOldVersion[0];
    const uid = '132';
    const page = 1;
    const size = 15;
    const orderBy = orderByEnum.ASC;
    const sortBy = "name";
    const countryId = "1";

    const returnedValue = await shippingAddressController.findShippingAddress(page, size, countryId, orderBy, sortBy, uid);
    expect(getShippingAddress).toHaveBeenCalled();
    expect(returnedValue).toEqual(expectedResult);
  });

  it('GET should return 403 when it cannnot retrieve data', async () => {
    const getShippingAddress = ShippingAddressService.prototype.getShippingAddress = jest.fn();
    getShippingAddress.mockImplementation(() => {
      throw new Error('error');
    });
    expect.assertions(3);

    const uid = '132';
    const page = 1;
    const size = 15;
    const orderBy = orderByEnum.ASC;
    const sortBy = "nickname";
    const countryId = "1";

    try {
      await shippingAddressController.findShippingAddress(page, size, countryId, orderBy, sortBy, uid);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('An error ocurred retrieving the data');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('GET should return 404 when it cannnot retrieve data', async () => {
    const getShippingAddress = ShippingAddressService.prototype.getShippingAddress = jest.fn();
    getShippingAddress.mockReturnValue({
      items: [],
      meta: {
        totalItems: 1,
        itemsPerPage: 1,
        currentPage: 1
      }
    });
    expect.assertions(3);

    const uid = '132';
    const page = 1;
    const size = 15;
    const orderBy = orderByEnum.ASC;
    const sortBy = "nickname";
    const countryId = "1";

    try {
      await shippingAddressController.findShippingAddress(page, size, countryId, orderBy, sortBy, uid);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('No shipping address for user with uid:');
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('GET should return 200 when get shipping address paginated is OK', async () => {
    const getShippingAddress = ShippingAddressService.prototype.getShippingAddress = jest.fn();
    getShippingAddress.mockReturnValue(mockShippingAddress.shippingAddressPaginated[0]);
    const expectedResult = mockShippingAddress.shippingAddressPaginated[0];
    const uid = '132';
    const page = 1;
    const size = 15;
    const orderBy = orderByEnum.ASC;
    const sortBy = "name";
    const countryId = "1";

    const returnedValue = await shippingAddressController.findShippingAddressPaginated(page, size, countryId, orderBy, sortBy, uid);
    expect(getShippingAddress).toHaveBeenCalled();
    expect(returnedValue).toEqual(expectedResult);
  });

  it('GET should return 403 when it cannnot retrieve data paginated', async () => {
    const getShippingAddress = ShippingAddressService.prototype.getShippingAddress = jest.fn();
    getShippingAddress.mockImplementation(() => {
      throw new Error('error');
    });
    expect.assertions(3);

    const uid = '132';
    const page = 1;
    const size = 15;
    const orderBy = orderByEnum.ASC;
    const sortBy = "nickname";
    const countryId = "1";

    try {
      await shippingAddressController.findShippingAddressPaginated(page, size, countryId, orderBy, sortBy, uid);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('An error ocurred retrieving the data');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('GET should return 404 when it cannnot retrieve data paginated', async () => {
    const getShippingAddress = ShippingAddressService.prototype.getShippingAddress = jest.fn();
    getShippingAddress.mockReturnValue({
      items: []
    });
    expect.assertions(3);

    const uid = '132';
    const page = 1;
    const size = 15;
    const orderBy = orderByEnum.ASC;
    const sortBy = "nickname";
    const countryId = "1";

    try {
      await shippingAddressController.findShippingAddressPaginated(page, size, countryId, orderBy, sortBy, uid);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('No shipping address for user with uid:');
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('DELETE should return 200 when delete shipping address is OK', async () => {
    const deleteShippingAddressById = ShippingAddressService.prototype.deleteShippingAddressById = jest.fn();
    deleteShippingAddressById.mockReturnValue(mockShippingAddress.shippingAddressDeleted[0]);
    const expectedResult = mockShippingAddress.shippingAddressDeleted[0];
    const shippingAddressIdForDelete = 1;

    const returnedValue = await shippingAddressController.delete(shippingAddressIdForDelete);

    expect(deleteShippingAddressById).toHaveBeenCalledWith(1);
    expect(returnedValue).toEqual(expectedResult);
  });

  it('PUT should return 403 when it cannnot delete data', async () => {
    const deleteShippingAddressById = ShippingAddressService.prototype.deleteShippingAddressById = jest.fn();
    const shippingAddressIdForDelete = 1;
    deleteShippingAddressById.mockImplementation(() => {
      throw new Error('error');
    });
    expect.assertions(3);

    try {
      await shippingAddressController.delete(shippingAddressIdForDelete);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('An error ocurred deleting shipping address');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });
});
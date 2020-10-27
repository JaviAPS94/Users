import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LivingPlaceDto } from '../../../src/livingPlace/dto/living-place.dto';
import { orderByEnum } from '../../../src/livingPlace/enums/oder-by.enum';
import { LivingPlaceController } from '../../../src/livingPlace/livingPlace.controller';
import { LivingPlaceService } from '../../../src/livingPlace/livingPlace.service';
import { mockLivingPlace } from '../../../test/mock-living-place';

describe('LivingPlace Controller', () => {
  let livingPlaceController: LivingPlaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivingPlaceController],
      providers: [LivingPlaceService]
    }).compile();
    livingPlaceController = module.get<LivingPlaceController>(LivingPlaceController);
  });

  it('POST should return 201 when post data is Ok', async () => {
    const createLivingPlace = LivingPlaceService.prototype.saveLivingPlace = jest.fn();
    createLivingPlace.mockReturnValue(mockLivingPlace.livingPlaceEntity[0]);
    const livingPlaceDto = new LivingPlaceDto();
    Object.assign(livingPlaceDto, mockLivingPlace.livingPlaces[0]);

    const returnedValue = await livingPlaceController.create(livingPlaceDto);
    expect(createLivingPlace).toHaveBeenCalled();
    expect(returnedValue).toEqual(mockLivingPlace.livingPlaceEntity[0]);
  });

  it('POST should return 403 when data to post is invalid', async () => {
    const createLivingPlace = LivingPlaceService.prototype.saveLivingPlace = jest.fn();
    createLivingPlace.mockImplementation(() => {
      throw new Error('error');
    });
    const livingPlaceDto = new LivingPlaceDto();
    Object.assign(livingPlaceDto, mockLivingPlace.livingPlaces[0]);

    expect.assertions(3);

    try {
      await livingPlaceController.create(livingPlaceDto);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('The input data is invalid');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('GET should return 200 when get living places is OK', async () => {
    const getLivingPlace = LivingPlaceService.prototype.getLivingPlace = jest.fn();
    getLivingPlace.mockReturnValue(mockLivingPlace.livingPlaceEntity);
    const expectedResult = mockLivingPlace.livingPlaceEntity;

    const countryId = 1;
    const orderBy = orderByEnum.ASC;
    const sortBy = "name";

    const returnedValue = await livingPlaceController.findLivingPlace(orderBy, sortBy, countryId);
    expect(getLivingPlace).toHaveBeenCalled();
    expect(returnedValue).toEqual(expectedResult);
  });

  it('GET should return 403 when it cannnot retrieve data', async () => {
    const getLivingPlace = LivingPlaceService.prototype.getLivingPlace = jest.fn();
    getLivingPlace.mockImplementation(() => {
      throw new Error('error');
    });
    expect.assertions(3);

    const countryId = 1;
    const orderBy = orderByEnum.ASC;
    const sortBy = "name";

    try {
      await livingPlaceController.findLivingPlace(orderBy, sortBy, countryId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('An error ocurred retrieving the data');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('GET should return 404 when it cannnot retrieve data', async () => {
    const getLivingPlace = LivingPlaceService.prototype.getLivingPlace = jest.fn();
    getLivingPlace.mockReturnValue([]);
    expect.assertions(3);

    const countryId = 1;
    const orderBy = orderByEnum.ASC;
    const sortBy = "name";

    try {
      await livingPlaceController.findLivingPlace(orderBy, sortBy, countryId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('No living place for country with id:');
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('PUT should return 200 when update living place is OK', async () => {
    const updateLivingPlaceById = LivingPlaceService.prototype.updateLivingPlaceById = jest.fn();
    updateLivingPlaceById.mockReturnValue(mockLivingPlace.livingPlaceEntity[0]);
    const expectedResult = mockLivingPlace.livingPlaceEntity[0];
    const livingPlaceIdForUpdate = 1;

    const returnedValue = await livingPlaceController.update(livingPlaceIdForUpdate, mockLivingPlace.livingPlaces[0]);

    expect(updateLivingPlaceById).toHaveBeenCalledWith(1, mockLivingPlace.livingPlaces[0]);
    expect(returnedValue).toEqual(expectedResult);
  });

  it('PUT should return 403 when it cannnot update data', async () => {
    const updateLivingPlaceById = LivingPlaceService.prototype.updateLivingPlaceById = jest.fn();
    const livingPlaceIdForUpdate = 1;
    updateLivingPlaceById.mockImplementation(() => {
      throw new Error('error');
    });
    expect.assertions(3);

    try {
      await livingPlaceController.update(livingPlaceIdForUpdate, mockLivingPlace.livingPlaces[0]);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('An error ocurred updating living place');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('DELETE should return 200 when delete living place is OK', async () => {
    const deleteLivingPlaceById = LivingPlaceService.prototype.deleteLivingPlaceById = jest.fn();
    deleteLivingPlaceById.mockReturnValue(mockLivingPlace.livingPlaceDeleted[0]);
    const expectedResult = mockLivingPlace.livingPlaceDeleted[0];
    const livingPlaceIdForDelete = 1;

    const returnedValue = await livingPlaceController.delete(livingPlaceIdForDelete);

    expect(deleteLivingPlaceById).toHaveBeenCalledWith(1);
    expect(returnedValue).toEqual(expectedResult);
  });

  it('PUT should return 403 when it cannnot delete data', async () => {
    const deleteBillingDataById = LivingPlaceService.prototype.deleteLivingPlaceById = jest.fn();
    const livingPlaceIdForDelete = 1;
    deleteBillingDataById.mockImplementation(() => {
      throw new Error('error');
    });
    expect.assertions(3);

    try {
      await livingPlaceController.delete(livingPlaceIdForDelete);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error).toContain('An error ocurred deleting living place');
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });
});
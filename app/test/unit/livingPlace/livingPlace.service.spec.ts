import { Test, TestingModule } from '@nestjs/testing';
import { LivingPlace } from '../../../src/entity/LivingPlace';
import { orderByEnum } from '../../../src/livingPlace/enums/oder-by.enum';
import { LivingPlaceService } from '../../../src/livingPlace/livingPlace.service';
import { EntityManagerWrapperService } from '../../../src/utils/entity-manager-wrapper.service';
import { mockLivingPlace } from '../../mock-living-place';

jest.mock('../../../src/utils/entity-manager-wrapper.service');

describe('LivingPlaceService', () => {
  let livingPlaceService: LivingPlaceService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivingPlaceService]
    }).compile();

    livingPlaceService = module.get<LivingPlaceService>(LivingPlaceService);
  });

  it('should insert living place in db', async () => {
    mockCreateLivingPlaceSuccessful();
    const dataToCreate = mockLivingPlace.livingPlaces[0];
    const livingPlace = new LivingPlace();
    Object.assign(livingPlace, mockLivingPlace.livingPlaces[0]);

    const wrapperService = new EntityManagerWrapperService();
    const result = await livingPlaceService.create(dataToCreate, wrapperService);

    expect(result).toEqual(livingPlace);
  });

  it('should throw error when create fails', async () => {
    mockCreateLivingPlaceFailure();
    const dataToCreate = mockLivingPlace.livingPlaces[0];
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await livingPlaceService.create(dataToCreate, wrapperService);
    } catch (error) {
      expect(error.message).toContain('LivingPlace Database Error:');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return a living places list by countryId', async () => {
    mockFindByCountryIdReturnedValue();
    const countryId = 1;
    const orderBy = orderByEnum.ASC;
    const sortBy = "name";
    const expectedResult = mockLivingPlace.livingPlaceEntity;

    const wrapperService = new EntityManagerWrapperService();
    const result = await livingPlaceService.findLivingPlace(countryId, orderBy, sortBy, wrapperService);

    expect(result).toEqual(expectedResult);
  });

  it('should throw error when find ByCountryId fails', async () => {
    mockFindByCountryIdFailure();
    const countryId = 1;
    const orderBy = orderByEnum.ASC;
    const sortBy = "name";
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await livingPlaceService.findLivingPlace(countryId, orderBy, sortBy, wrapperService);
    } catch (error) {
      expect(error.message).toContain('LivingPlace Find error:');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return a living place by id', async () => {
    mockFindById();
    const livingPlaceId = 1;
    const expectedResult = mockLivingPlace.livingPlaceEntity[0];

    const wrapperService = new EntityManagerWrapperService();
    const result = await livingPlaceService.findLivingPlaceById(livingPlaceId, wrapperService);

    expect(result).toEqual(expectedResult);
  });

  it('should throw error when find by id fails', async () => {
    mockFindByIdFailure();
    const livingPlaceId = 1;
    const wrapperService = new EntityManagerWrapperService();

    try {
      await livingPlaceService.findLivingPlaceById(livingPlaceId, wrapperService);
    } catch (error) {
      expect(error.message).toContain('LivingPlaceById Find error:');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should update a living place in db', async () => {
    mockUpdateLivingPlaceSuccessful();
    const returnedLivingPlace = mockFindLivingPlaceById();
    const dataToUpdate = mockLivingPlace.livingPlaces[0];
    const expectedResult = new LivingPlace();
    Object.assign(expectedResult, mockLivingPlace.livingPlaces[0]);
    const livingPlaceId = 1;

    const wrapperService = new EntityManagerWrapperService();
    const result = await livingPlaceService.updateLivingPlace(livingPlaceId, dataToUpdate, wrapperService);

    expect(result).toEqual(expectedResult);
    expect(returnedLivingPlace).toHaveBeenLastCalledWith(livingPlaceId, wrapperService);
  });

  it('should throw error when findLivingPlaceById is empty in update', async () => {
    mockFindLivingPlaceByIdEmpty();
    const dataToCreate = mockLivingPlace.livingPlaces[0];
    const livingPlaceId = 1;
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await livingPlaceService.updateLivingPlace(livingPlaceId, dataToCreate, wrapperService);
    } catch (error) {
      expect(error.message).toContain('LivingPlace needs a VALID id');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should throw error when update fails', async () => {
    mockUpdateLivingPlaceFailure();
    const dataToUpdate = mockLivingPlace.livingPlaces[0];
    const livingPlaceId = 1;
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await livingPlaceService.updateLivingPlace(livingPlaceId, dataToUpdate, wrapperService);
    } catch (error) {
      expect(error.message).toContain('Update LivingPlace Database Error:');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should soft delete a living place in db', async () => {
    mockDeleteLivingPlaceSuccessful();
    const returnedLivingPlace = mockFindLivingPlaceById();
    const expectedResult = mockLivingPlace.livingPlaceDeleted[0];
    const livingPlaceId = 1;

    const wrapperService = new EntityManagerWrapperService();
    const result = await livingPlaceService.deleteLivingPlace(livingPlaceId, wrapperService);

    expect(result).toEqual(expectedResult);
    expect(returnedLivingPlace).toHaveBeenLastCalledWith(livingPlaceId, wrapperService);
  });

  it('should throw error when findLivingPlaceById is empty in soft delete', async () => {
    mockFindLivingPlaceByIdEmpty();
    const livingPlaceId = 1;
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await livingPlaceService.deleteLivingPlace(livingPlaceId, wrapperService);
    } catch (error) {
      expect(error.message).toContain('LivingPlace needs a VALID id');
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should throw error when delete fails', async () => {
    mockDeleteLivingPlaceFailure();
    const livingPlaceId = 1;
    const wrapperService = new EntityManagerWrapperService();
    expect.assertions(2);

    try {
      await livingPlaceService.deleteLivingPlace(livingPlaceId, wrapperService);
    } catch (error) {
      expect(error.message).toContain('Delete Living Place Database Error:');
      expect(error).toBeInstanceOf(Error);
    }
  });
});

const mockCreateLivingPlaceSuccessful = () => {
  const returnedLivingPlace = new LivingPlace();
  Object.assign(returnedLivingPlace, mockLivingPlace.livingPlaces[0]);
  const save = EntityManagerWrapperService.prototype.save = jest.fn();
  save.mockReturnValue(returnedLivingPlace);
};

const mockCreateLivingPlaceFailure = () => {
  const save = EntityManagerWrapperService.prototype.save = jest.fn();
  save.mockImplementation(() => { throw new Error('ANY.ERROR') });
};

const mockFindByCountryIdReturnedValue = () => {
  const findLivingPlacesByCountryId = EntityManagerWrapperService.prototype.findLivingPlacesByCountryId = jest.fn();
  findLivingPlacesByCountryId.mockReturnValue(mockLivingPlace.livingPlaceEntity);
};

const mockFindByCountryIdFailure = () => {
  const findLivingPlacesByCountryId = EntityManagerWrapperService.prototype.findLivingPlacesByCountryId = jest.fn();
  findLivingPlacesByCountryId.mockImplementation(() => { throw new Error('ANY.ERROR') });
};

const mockFindById = () => {
  const findLivingPlaceById = EntityManagerWrapperService.prototype.findLivingPlaceById = jest.fn();
  return findLivingPlaceById.mockReturnValue(mockLivingPlace.livingPlaceEntity[0]);
};

const mockFindByIdFailure = () => {
  const findLivingPlaceById = EntityManagerWrapperService.prototype.findLivingPlaceById = jest.fn();
  findLivingPlaceById.mockImplementation(() => { throw new Error('ANY.ERROR') });
};

const mockUpdateLivingPlaceSuccessful = () => {
  const returnedLivingPlace = new LivingPlace();
  Object.assign(returnedLivingPlace, mockLivingPlace.livingPlaces[0]);
  const save = EntityManagerWrapperService.prototype.save = jest.fn();
  save.mockReturnValue(returnedLivingPlace);
};

const mockFindLivingPlaceById = () => {
  const findLivingPlaceById = LivingPlaceService.prototype.findLivingPlaceById = jest.fn();
  return findLivingPlaceById.mockReturnValue([mockLivingPlace.livingPlaceEntity[0]]);
};

const mockFindLivingPlaceByIdEmpty = () => {
  const findLivingPlaceById = LivingPlaceService.prototype.findLivingPlaceById = jest.fn();
  return findLivingPlaceById.mockReturnValue([]);
};

const mockUpdateLivingPlaceFailure = () => {
  const save = EntityManagerWrapperService.prototype.save = jest.fn();
  save.mockImplementation(() => { throw new Error('ANY.ERROR') });
};

const mockDeleteLivingPlaceSuccessful = () => {
  const deleteLivingPlace = EntityManagerWrapperService.prototype.deleteLivingPlace = jest.fn();
  return deleteLivingPlace.mockReturnValue(mockLivingPlace.livingPlaceDeleted[0]);
}

const mockDeleteLivingPlaceFailure = () => {
  const deleteLivingPlace = EntityManagerWrapperService.prototype.deleteLivingPlace = jest.fn();
  deleteLivingPlace.mockImplementation(() => { throw new Error('ANY.ERROR') });
};
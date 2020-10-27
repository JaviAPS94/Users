import { AlreadyExistDocumentConstraint, AlreadyExistPhoneNumberConstraint, BirthdateConstraint, ConditionalDocumentConstraint, ConditionalDocumentTypeConstraint, customValidation, DocumentTypesConstraint, DocumentValidationConstraint } from '../../src/utils/custom-validations.service';
import { EntityManagerWrapperService } from '../../src/utils/entity-manager-wrapper.service';
import { mockCustomValidator } from '../../test/mock-custom-validator';

jest.mock('../../src/utils/entity-manager-wrapper.service');

describe('Custom Validation', () => {
  let test: DocumentValidationConstraint;
  let alreadyExistPhoneNumberConstraint: AlreadyExistPhoneNumberConstraint;
  let conditionalDocumentConstraint: ConditionalDocumentConstraint;
  let conditionalDocumentTypeConstraint: ConditionalDocumentTypeConstraint;
  let birthdateConstraint: BirthdateConstraint;
  let documentTypesConstraint: DocumentTypesConstraint;
  let alreadyExistDocumentConstraint: AlreadyExistDocumentConstraint;

  beforeEach(() => {
    test = new DocumentValidationConstraint();
    alreadyExistPhoneNumberConstraint = new AlreadyExistPhoneNumberConstraint();
    conditionalDocumentConstraint = new ConditionalDocumentConstraint();
    conditionalDocumentTypeConstraint = new ConditionalDocumentTypeConstraint();
    birthdateConstraint = new BirthdateConstraint();
    documentTypesConstraint = new DocumentTypesConstraint();
    alreadyExistDocumentConstraint = new AlreadyExistDocumentConstraint();
  });

  describe('transform', () => {
    it('should return true if validation of CI is successfull', async () => {
      const result = await test.validDocument("1719711176", "CI");
      expect(result).toBe(true);
    });

    it('should return true if validation of RUC is successfull', async () => {
      const result = await test.validDocument("1719711176001", "RUC");
      expect(result).toBe(true);
    });

    it('should return true if validation of CI_CO is successfull', async () => {
      const result = await test.validDocument("1719711176", "CI_CO");
      expect(result).toBe(true);
    });

    it('should return true if validation of CE is successfull', async () => {
      const result = await test.validDocument("171971", "CE");
      expect(result).toBe(true);
    });

    it('should return true if validation of NIT is successfull', async () => {
      const result = await test.validDocument("1719711176", "NIT");
      expect(result).toBe(true);
    });

    it('should return true if validation of PASSPORT is successfull', async () => {
      const result = await test.validDocument("ABCDEFGHI", "PASSPORT");
      expect(result).toBe(true);
    });

    it('should return true if validation of RUT is successfull', async () => {
      const result = await test.validDocument("ABCDEFGHI", "RUT");
      expect(result).toBe(true);
    });

    it('should return true if validation of default is successfull', async () => {
      const result = await test.validDocument("ABCDEFGHI", "TEST");
      expect(result).toBe(false);
    });

    it('should return true if validation of RUC with coeficients is successfull', async () => {
      const document = "1719711176001";
      const coefficientsRucLegalPerson = [4, 3, 2, 7, 6, 5, 4, 3, 2];
      const result = await test.validateRUC(document, coefficientsRucLegalPerson, document.charAt(9));
      expect(result).toBe(false);
    });

    it('should return true if validation of RUC with coeficients is successfull', async () => {
      const document = "1719711176001";
      const coefficientsRucLegalPerson = [4, 3, 2, 7, 6, 5, 4, 3, 2];
      const result = await test.validateRUC(document, coefficientsRucLegalPerson, document.charAt(9));
      expect(result).toBe(false);
    });

    it('should return true if validation of birthdate is successfull', async () => {
      const result = await customValidation("1994-11-17", { "birthdateMin": 18, "birthdateMax": 100 })
      expect(result).toBe(true);
    });

    it('should return true if validation of required is successfull', async () => {
      const result = await customValidation("1994-11-17", { "required": true })
      expect(result).toBe(true);
    });

    it('should return true if validation of in is successfull', async () => {
      const result = await customValidation("1", { "in": ["1", "2", "3"] })
      expect(result).toBe(true);
    });

    it('should return false if validation of default is successfull', async () => {
      const result = await customValidation("1994-11-17", { "test": 18 })
      expect(result).toBe(false);
    });

    it('should return true if validation of required is false and value is undefined', async () => {
      const result = await customValidation(undefined, { "required": false })
      expect(result).toBe(true);
    });

    it('should return true if validation of alreadyExistPhoneNumberConstraint is successfull', async () => {
      mockFindUserByPhoneNumber();
      const wrapperService = new EntityManagerWrapperService();
      const result = await alreadyExistPhoneNumberConstraint.validPhoneNumber("0958632589", wrapperService);
      expect(result).toBe(true);
    });

    it('should return true if validation of conditionalDocument is successfull', async () => {
      mockFindUserByUidAndCountry();
      const wrapperService = new EntityManagerWrapperService();
      const result = await conditionalDocumentConstraint.validConditionalDocument("1719711176", "test", 1, wrapperService);
      expect(result).toBe(true);
    });

    it('should return true if validation of conditionalDocumentType is successfull', async () => {
      mockFindUserByUidAndCountry();
      const wrapperService = new EntityManagerWrapperService();
      const result = await conditionalDocumentTypeConstraint.validConditionalDocumentType("1719711176", "test", 1, wrapperService);
      expect(result).toBe(true);
    });

    it('should return true if validation of birthdate is successfull', async () => {
      mockFindProperties();
      const wrapperService = new EntityManagerWrapperService();
      const result = await birthdateConstraint.validBirthDate("1994-05-01", wrapperService);
      expect(result).toBe(true);
    });

    it('should return true if validation of document type is successfull', async () => {
      mockFindPropertiesDocumentType();
      const wrapperService = new EntityManagerWrapperService();
      const result = await documentTypesConstraint.validDocumentType("CI", wrapperService);
      expect(result).toBe(true);
    });

    it('should return true if validation of document exists in db type is successfull', async () => {
      mockFindUserByUidAndDocumentByCountry();
      const wrapperService = new EntityManagerWrapperService();
      const result = await alreadyExistDocumentConstraint.validateIfDocumentExistsInDb("1719711176", "test", 1, 1, wrapperService);
      expect(result).toBe(true);
    });
  });
});

const mockFindUserByPhoneNumber = () => {
  const findUserByPhoneNumber = EntityManagerWrapperService.prototype.findUserByPhoneNumber = jest.fn();
  findUserByPhoneNumber.mockReturnValue(undefined);
};

const mockFindUserByUidAndCountry = () => {
  const findUserByUidAndCountry = EntityManagerWrapperService.prototype.findUserByUidAndCountry = jest.fn();
  findUserByUidAndCountry.mockReturnValue(undefined);
}

const mockFindProperties = () => {
  const findProperties = EntityManagerWrapperService.prototype.findProperties = jest.fn();
  findProperties.mockReturnValue(mockCustomValidator.birthDateRules[0])
}

const mockFindPropertiesDocumentType = () => {
  const findProperties = EntityManagerWrapperService.prototype.findProperties = jest.fn();
  findProperties.mockReturnValue(mockCustomValidator.documentTypeRules[0])
}

const mockFindUserByUidAndDocumentByCountry = () => {
  const findUserByUidAndDocumentByCountry = EntityManagerWrapperService.prototype.findUserByUidAndDocumentByCountry = jest.fn();
  findUserByUidAndDocumentByCountry.mockReturnValue(undefined);
}
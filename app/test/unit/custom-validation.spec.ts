import { mockUser } from '../../test/mock-user';
import { AlreadyExistPhoneNumberConstraint, customValidation, DocumentValidationConstraint } from '../../src/utils/custom-validations.service';
import { EntityManagerWrapperService } from '../../src/utils/entity-manager-wrapper.service';

jest.mock('../../src/utils/entity-manager-wrapper.service');

describe('Custom Validation', () => {
  let test: DocumentValidationConstraint;
  let alreadyExistPhoneNumberConstraint: AlreadyExistPhoneNumberConstraint;

  beforeEach(() => {
    test = new DocumentValidationConstraint();
    alreadyExistPhoneNumberConstraint = new AlreadyExistPhoneNumberConstraint();
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
  });
});

const mockFindUserByPhoneNumber = () => {
  const findUserByPhoneNumber = EntityManagerWrapperService.prototype.findUserByPhoneNumber = jest.fn();
  findUserByPhoneNumber.mockReturnValue(undefined);
};
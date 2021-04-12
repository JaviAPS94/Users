import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import * as _ from "lodash";
import * as moment from "moment";
import { getManager } from 'typeorm';
import { userType } from '../../src/users/enums/user-type.enum';
import { EntityManagerWrapperService } from './entity-manager-wrapper.service';

export const Birthdate = (account: string, document: string, validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [account, document],
      validator: BirthdateConstraint,
    });
  };
}

export const AlreadyExistPhoneNumber = (userTypePhoneValidation: string, validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [userTypePhoneValidation],
      validator: AlreadyExistPhoneNumberConstraint,
    });
  };
}

export const DocumentTypes = (account: string, validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [account],
      validator: DocumentTypesConstraint
    });
  };
}

export const DocumentValidation = (documentType: string, validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [documentType],
      validator: DocumentValidationConstraint
    });
  };
}

export const AlreadyExistDocument = (uid: string, countryId: string, account: string, validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [uid, countryId, account],
      validator: AlreadyExistDocumentConstraint
    });
  };
}

export const ConditionalDocument = (uid: string, countryId: string, validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [uid, countryId],
      validator: ConditionalDocumentConstraint
    });
  };
}

export const ConditionalDocumentType = (uid: string, countryId: string, validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [uid, countryId],
      validator: ConditionalDocumentTypeConstraint
    });
  };
}

@ValidatorConstraint({ name: 'ConditionalDocument' })
export class ConditionalDocumentConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const wraperService = new EntityManagerWrapperService(getManager());
    const uid = (args.object as any)[args.constraints[0]];
    const country = (args.object as any)[args.constraints[1]];
    return await this.validConditionalDocument(value, uid, country.id, wraperService);
  }

  defaultMessage(args: ValidationArguments) {
    //TODO: it is showing in multimarca's app, is neccesary apply translation
    return "Número de documento inválido";
  }

  async validConditionalDocument(value: any, uid: string, countryId: number, connection: EntityManagerWrapperService) {
    const user = await connection.findUserByUidAndCountry(uid);
    const currentDocument = user.documentByUser.find(document => document.countryId === countryId);
    return (!_.isUndefined(currentDocument)) ? ((currentDocument.document === value) ? true : false)
      : true;
  }
}

@ValidatorConstraint({ name: 'ConditionalDocumentType' })
export class ConditionalDocumentTypeConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const uid = (args.object as any)[args.constraints[0]];
    const country = (args.object as any)[args.constraints[1]];
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.validConditionalDocumentType(value, uid, country.id, wraperService);
  }

  defaultMessage(args: ValidationArguments) {
    //TODO: it is showing in multimarca app, is neccesary apply translation's
    return "Número de documento inválido";
  }

  async validConditionalDocumentType(value: any, uid: string, countryId: number, connection: EntityManagerWrapperService) {
    const user = await connection.findUserByUidAndCountry(uid);
    const currentDocument = user.documentByUser.find(document => document.countryId === countryId);
    return (!_.isUndefined(currentDocument)) ? ((currentDocument.documentType === value) ? true : false)
      : true;
  }
}

@ValidatorConstraint({ name: 'Birthdate' })
export class BirthdateConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.validBirthDate(value, wraperService);
  }

  defaultMessage(args: ValidationArguments) {
    return "The birthdate must be in a valid range";
  }

  async validBirthDate(value: any, connection: EntityManagerWrapperService) {
    // TODO custom validation
    // const account = (args.object as any)[args.constraints[0]];
    // const document = (args.object as any)[args.constraints[1]];
    const test = await connection.findProperties({
      where: { id: 1 },
    });

    return !_.isUndefined(test) ? customValidation(value, test.rules['birthdate']) : true;
  }
}

@ValidatorConstraint({ name: 'AlreadyExistPhoneNumber' })
export class AlreadyExistPhoneNumberConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const userTypeEnum = userType[(args.object as any)[args.constraints[0]]];
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.validPhoneNumber(value.number, userTypeEnum, wraperService);
  }

  defaultMessage(args: ValidationArguments) {
    return "The phone number already exist in the database";
  }

  async validPhoneNumber(value: any, userTypeEnum: userType, connection: EntityManagerWrapperService) {
    if (userTypeEnum === userType.DEPENDENT) {
      return true;
    }
    const userByPhoneNumber = await connection.findUserByPhoneNumber(value);
    return (_.isUndefined(userByPhoneNumber)) ? true : false;
  }
}

@ValidatorConstraint({ name: 'DocumentTypes' })
export class DocumentTypesConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.validDocumentType(value, wraperService);
  }

  defaultMessage(args: ValidationArguments) {
    return "The document type must be have a valid value";
  }

  async validDocumentType(value: any, connection: EntityManagerWrapperService) {
    // TODO custom validation
    //const account = (args.object as any)[args.constraints[0]];
    //const document = (args.object as any)[args.constraints[1]];
    const test = await connection.findProperties({
      where: { id: 1 },
    });

    return !_.isUndefined(test) ? customValidation(value, test.rules['documentType']) : true;
  }
}

@ValidatorConstraint({ name: 'DocumentValidation' })
export class DocumentValidationConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const documentType = (args.object as any)[args.constraints[0]];
    return await this.validDocument(value, documentType);
  }

  defaultMessage(args: ValidationArguments) {
    //TODO: it is showing in multimarca app, is neccesary apply translation's
    return "Número de documento inválido";
  }

  async validDocument(value: any, documentType: string) {
    const documentValidationCases = {
      CI: (document: string) => {
        return this.validateCI(document);
      },
      RUC: (document: any) => {
        return this.validateRUCAndPersonType(document);
      },
      CI_CO: (document: any) => {
        return this.validateCI_CO(document)
      },
      CE: (document: any) => {
        return this.validateCE(document)
      },
      NIT: (document: any) => {
        return this.validateNIT(document)
      },
      PASSPORT: (document: any) => {
        return this.validatePassport(document)
      },
      RUT: (document: any) => {
        return this.validateRut(document)
      },
      DNI: (document: any) => {
        return true;
      },
      default: () => {
        return false;
      }
    };

    return (documentValidationCases[documentType] || documentValidationCases['default'])(value);
  }

  public validateCI = (document: any) => {
    const CICoefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    return (
      this.validateProvince(document.substring(0, 2)) &&
      this.validateEcuadorianCI(document, CICoefficients)
    );
  }

  public validateEcuadorianCI = (document: any, coefficient: any) => {
    let sumDigitsPerCoefficient = 0;
    let value = 0;
    for (let i = 0; i < coefficient.length; i++) {
      const digit = document.charAt(i) * 1;
      value = coefficient[i] * digit;
      if (value > 9) {
        value = value - 9;
      }
      sumDigitsPerCoefficient = sumDigitsPerCoefficient + value;
    }
    let divisonModule = sumDigitsPerCoefficient % 10;
    divisonModule = (divisonModule === 0) ? 10 : divisonModule;
    const result = 10 - divisonModule;
    const lastDigit = document.charAt(9) * 1;
    if (result === lastDigit) {
      return true;
    }
    return false;
  }

  public validateProvince = (document: any) => {
    if (parseInt(document) <= 0 || parseInt(document) > 24) {
      return false;
    }
    return true;
  }

  public validateRUCAndPersonType = (document: any) => {
    const coefficientsRucLegalPerson = [4, 3, 2, 7, 6, 5, 4, 3, 2];
    const coefficientsRucPublicCompany = [3, 2, 7, 6, 5, 4, 3, 2];
    return ((this.isNaturalPersonRuc(document) &&
      this.validateCI(document))
      || (this.isLegalPersonRuc(document) &&
        this.validateRUC(document, coefficientsRucLegalPerson, document.charAt(9)))
      || (this.isPublicCompanyRUC(document) &&
        this.validateRUC(document, coefficientsRucPublicCompany, document.charAt(8))));
  }

  public isNaturalPersonRuc = (document: any) => {
    if (document.length === 13 && document.charAt(2) !== "6" &&
      document.charAt(2) !== "9" && document.substring(10, 13) === "001") {
      return true;
    }
    return false;
  }

  public isLegalPersonRuc = (document: any) => {
    if (this.lastDigitsRuc(document) && document.charAt(2) === "9") {
      return true;
    }
    return false;
  }

  public isPublicCompanyRUC = (document: any) => {
    if (this.lastDigitsRuc(document) && document.charAt(2) === "6") {
      return true;
    }
    return false;
  }

  public lastDigitsRuc = (document: any) => {
    if (document.length === 13 && document.substring(10, 13) === "001") {
      return true;
    }
    return false;
  }

  public validateRUC = (document: any, coefficients: any, checkDigit: any) => {
    const id = document;
    const checker = checkDigit * 1;
    let totalSumDigitsPerCoefficient = 0;
    let digit = 0;
    let value = 0;
    for (let i = 0; i < coefficients.length; i++) {
      digit = id.charAt(i) * 1;
      value = coefficients[i] * digit;
      totalSumDigitsPerCoefficient = totalSumDigitsPerCoefficient + value;
    }
    const divisionModule = totalSumDigitsPerCoefficient % 11;
    let result = 0;
    if (divisionModule !== 0) {
      result = 11 - divisionModule;
    }

    if (result === checker) {
      return true;
    }
    return false;
  }

  public validateCI_CO(document) {
    if (this.checkRequired(document)) {
      return /^\d{6,11}$/.test(document);
    }
    return false;
  }

  public validateCE(document) {
    if (this.checkRequired(document)) {
      return /^\d{5,7}$/.test(document);
    }
    return false;
  }

  public checkRequired(element) {
    return element != null && element !== '' && typeof element !== 'undefined';
  }

  public validateNIT(document) {
    if (this.checkRequired(document)) {
      return /^\d{7,10}$/.test(document);
    }
    return false;
  }

  public validatePassport(document) {
    if (this.checkRequired(document)) {
      let length = document.length;
      return length <= 20;
    }
    return false;
  }

  public validateRut(document) {
    if (this.checkRequired(document)) {
      let length = document.length;
      return length <= 20;
    }
    return false;
  }
}

@ValidatorConstraint({ name: 'AlreadyExistDocument' })
export class AlreadyExistDocumentConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const wraperService = new EntityManagerWrapperService(getManager());
    const uid = (args.object as any)[args.constraints[0]];
    const country = (args.object as any)[args.constraints[1]];
    const accountId = (args.object as any)[args.constraints[2]];
    return await this.validateIfDocumentExistsInDb(value, uid, country.id, accountId, wraperService);
  }

  defaultMessage(args: ValidationArguments) {
    return "The document already exist in the database";
  }

  async validateIfDocumentExistsInDb(value: any, uid: string, countryId: number, accountId: number, connection: EntityManagerWrapperService) {
    const userByUidAndDocumentByCountry = await connection.findUserByUidAndDocumentByCountry(value, uid, countryId, accountId);
    return (_.isUndefined(userByUidAndDocumentByCountry)) ? true : false;
  }
}

export const customValidation = (value, rules) => {
  const result = [];
  const validationCases = {
    required: (requiredValue: any, ruleValue: any) => {
      return ruleValue ? (!_.isUndefined(requiredValue)) : true;
    },
    birthdateMin: (birthdateMinValue: any, ruleValue: any) => {
      const birthdate = moment(birthdateMinValue, "YYYY-MM-DD");
      const today = moment();
      const validMinBirthdate = today.subtract(ruleValue, "years");
      return (birthdate <= validMinBirthdate);
    },
    birthdateMax: (birthdateMaxValue: any, ruleValue: any) => {
      const birthdate = moment(birthdateMaxValue, "YYYY-MM-DD");
      const today = moment();
      const validMaxBirthdate = today.subtract(ruleValue, "years");
      return (birthdate >= validMaxBirthdate);
    },
    in: (inValue: any, ruleValue: any) => {
      return ruleValue.includes(inValue);
    },
    default: () => {
      return false;
    }
  };

  for (const key in rules) {
    if (key === "required" && !rules[key] && _.isUndefined(value)) {
      return true;
    }
    result.push((validationCases[key] || validationCases['default'])(value, rules[key]));
  }

  return !result.includes(false);
}
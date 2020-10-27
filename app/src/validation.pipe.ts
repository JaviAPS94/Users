import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    const responseErrors = errors.map(error => {
      return {
        field: error.property,
        constraints: (error.children.length > 0) ? error.children.map(childrenError => {
          return {
            field: childrenError.property,
            constraints: childrenError.constraints
          }
        }) : error.constraints
      }
    })
    if (responseErrors.length > 0) {
      throw new UnprocessableEntityException(responseErrors);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

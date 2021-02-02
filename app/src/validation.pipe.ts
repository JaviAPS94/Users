import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
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
    const responseErrors = this.transformError(errors);

    if (responseErrors.length > 0) {
      throw new UnprocessableEntityException(
        {
          code: HttpStatus.BAD_REQUEST,
          message: 'Error de Validacion',
          status: 'error',
          warning: responseErrors,
          error: [],
        },
        'Error de Validacion',
      );
    }

    return value;
  }

  private transformError(errors: any) {
    return errors.map(error => {
      return {
        field: error.property,
        code: null,
        value: this.transformItemError(error.constraints),
        constraints:
          error.children.length > 0
            ? this.transformError(error.children)
            : error.constraints,
      };
    });
  }
  private transformItemError(constraints: any) {
    let message = '';
    for (const key in constraints) {
      message += constraints[key];
    }
    return message;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

import { Body, Controller, HttpException, HttpStatus, Post, Put } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() userDto: UserDto) {
    try {
      return await this.userService.saveUser(userDto);
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'The input data is invalid ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }

  @Put()
  async update(@Body() userDto: UserDto) {
    try {
      return await this.userService.updateUser(userDto);
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'The input data is invalid ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }
}

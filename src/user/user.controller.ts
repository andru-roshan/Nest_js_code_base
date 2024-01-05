import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { userDetailsDto } from './create-user.dto';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}
  @Get()
  findAllUser(@Query('id') id: string) {
    return this.service?.findAllUser(id);
  }
  @Get(':id')
  findParticularUser(@Param('id') id: string) {
    try {
      return this.service?.findParticularUser(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
  @Post()
  postUserData(@Body(new ValidationPipe()) createUser: userDetailsDto) {
    return this.service?.createUser(createUser);
  }
  @Patch(':id')
  patchUserData(@Param('id') id: string, @Body() updateUser: userDetailsDto) {
    return this.service?.updateUser(id, updateUser);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.service?.deleteUser(id);
  }
}

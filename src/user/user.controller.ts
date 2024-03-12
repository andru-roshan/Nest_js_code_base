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
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { userDetailsDto } from './create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAllUser(@Query('id') id: string) {
    return this.service?.findAllUser(id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findParticularUser(@Param('id') id: string) {
    try {
      return this.service?.findParticularUser(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  postUserData(@Body(new ValidationPipe()) createUser: userDetailsDto) {
    console.log('user', createUser);
    return this.service?.createUser(createUser);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  patchUserData(@Param('id') id: string, @Body() updateUser: userDetailsDto) {
    return this.service?.updateUser(id, updateUser);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.service?.deleteUser(id);
  }
}

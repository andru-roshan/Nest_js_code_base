import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { userDetailsDto } from './create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'utils/enum/roles.enum';
import { RolesGuard } from 'src/guard/role.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Get()
  findAllUser() {
    return this.service?.findAllUser();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Get(':id')
  findParticularUser(@Param('id') id: string) {
    try {
      return this.service?.findParticularUser(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @Post()
  @Roles(Role.Admin)
  async postUserData(@Body(new ValidationPipe()) createUser: userDetailsDto) {
    const isUserExits = await this.service.CheckUsername({
      employee_id: createUser.employee_id,
      employee_email: createUser.employee_email,
    });
    if (isUserExits) {
      throw new HttpException('user already exist', HttpStatus?.BAD_REQUEST);
    } else {
      return this.service?.createUser(createUser);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @Patch(':id')
  @Roles(Role.Admin)
  patchUserData(@Param('id') id: string, @Body() updateUser: userDetailsDto) {
    return this.service?.updateUser(id, updateUser);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @Delete(':id')
  @Roles(Role.Admin)
  deleteUser(@Param('id') id: string) {
    return this.service?.deleteUser(id);
  }
}

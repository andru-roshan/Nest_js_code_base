import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { userDetailsDto } from './create-user.dto';
import { PrismaService } from 'src/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { messages } from 'utils/constant';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAllUser(id?: string) {
    const user = await this.prisma.userDetails.findMany({ where: { id } });
    return { message: messages.GET_USER, data: user, statusCode: '200' };
  }
  async findParticularUserByName(employee_name?: string) {
    const user = await this.prisma.userDetails.findMany();
    const value = user?.find((item) => item?.employee_name === employee_name);
    return { message: 'success', data: value, statusCode: '200' };
  }
  async findParticularUser(id?: string) {
    const user = await this.prisma.userDetails.findUnique({ where: { id } });
    if (!user) {
      throw new Error('User Not Found');
    }
    return { message: 'success', data: user, statusCode: '200' };
  }

  async CheckUsername(data: any) {
    let user;
    let emailExist;
    const id = data?.employee_id;
    const email = data?.employee_email;
    try {
      user = await this.prisma.userDetails.findUnique({
        where: { employee_id: id },
      });
      emailExist = await this.prisma.userDetails.findUnique({
        where: { employee_email: email },
      });
      if (user || emailExist) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
  }
  async createUser(body?: userDetailsDto) {
    const saltOrRounds = 10;
    const password = body.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const payload = {
      employee_name: body?.employee_name,
      employee_email: body?.employee_email,
      employee_id: body?.employee_id,
      role: body?.role,
      password: hash,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const user = await this.prisma.userDetails.create({ data: payload });
    return {
      message: messages?.CREATE_USER,
      data: user,
      statusCode: '200',
    };
  }
  async updateUser(id?: string, updateUser?: userDetailsDto) {
    const saltOrRounds = 10;
    const user = await this.prisma.userDetails.findUnique({ where: { id } });
    const hash = await bcrypt.hash(user?.password, saltOrRounds);
    const updatedValue = {
      employee_name: updateUser?.employee_name,
      employee_email: user?.employee_email,
      employee_id: user?.employee_id,
      password: hash,
      role: user?.role,
      createdAt: user?.createdAt,
      updatedAt: new Date().toISOString(),
    };

    if (updateUser?.employee_email) {
      throw new HttpException(
        'Not able to update the email becasue its unique value',
        HttpStatus?.BAD_REQUEST,
      );
    }
    if (updateUser?.employee_id) {
      throw new HttpException(
        'Not able to update the id becasue its unique value',
        HttpStatus?.BAD_REQUEST,
      );
    }
    if (updateUser?.role) {
      throw new HttpException(
        'Not able to update the role',
        HttpStatus?.BAD_REQUEST,
      );
    }

    const value = await this.prisma.userDetails.update({
      where: { id },
      data: updatedValue,
    });
    return {
      message: messages?.UPDATE_USER,
      data: value,
      statusCode: '200',
    };
  }
  async deleteUser(id?: string) {
    const user = await this.prisma.userDetails.delete({ where: { id } });
    return {
      message: messages?.DELETE_USER,
      data: user,
    };
  }
}

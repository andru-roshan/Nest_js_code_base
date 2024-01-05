import { Injectable } from '@nestjs/common';
import { userDetailsDto } from './create-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAllUser(id?: string) {
    const user = await this.prisma.userDetails.findMany({ where: { id } });
    return user;
  }
  async findParticularUser(id?: string) {
    const user = await this.prisma.userDetails.findUnique({ where: { id } });
    if (!user) {
      throw new Error('User Not Found');
    }
    console.log('user', user);
    return user;
  }
  async createUser(body?: userDetailsDto) {
    const user = await this.prisma.userDetails.create({ data: body });
    console.log('user', user);
    return {
      message: 'success',
      data: user,
      statusCode: '200',
    };
  }
  async updateUser(id?: string, updateUser?: userDetailsDto) {
    const user = await this.prisma.userDetails.update({
      where: { id },
      data: updateUser,
    });
    return {
      message: 'success',
      data: user,
      statusCode: '200',
    };
  }
  async deleteUser(id?: string) {
    const user = await this.prisma.userDetails.delete({ where: { id } });
    return {
      message: 'user deleted successfully',
      data: user,
    };
  }
}

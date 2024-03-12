import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'utils/constant';
import { UserController } from 'src/user/user.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants?.expriesIn },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, PrismaService],
})
export class AuthModule {}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from 'utils/constant';

@Injectable()
export class AuthService {
  constructor(
    private userServices: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user: any =
      await this.userServices.findParticularUserByName(username);
    if (user?.data?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user?.data?.id, name: user?.data?.employee_name };
    const token = await this.jwtService.sign(
      { payload },
      {
        privateKey: jwtConstants.secret,
      },
    );
    return {
      id: user?.data?.id,
      employee_name: user?.data?.employee_name,
      access_token: token,
    };
  }
}

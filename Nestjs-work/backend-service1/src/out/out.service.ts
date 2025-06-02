import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/users/user.service';
import { SignUpDto } from './dto/singup.dto';
import { SignInDto } from './dto/singin.dto';
import { Tokens } from './types';

 
@Injectable()
export class OutService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
 
  
  async signup(dto: SignUpDto): Promise<Tokens> {
    const existingUser = await this.userService.findByEmail(dto.email);
    if (existingUser) {
      throw new ForbiddenException('User already exists');
    }
 
    const hashedPassword = await bcrypt.hash(dto.password, 10);
 
    const newUser = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });
 
    const userObject = newUser.toJSON();
    return this.getTokens(userObject.id, userObject.email);
  }
 
  
  async signin(dto: SignInDto): Promise<Tokens> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
 
    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) {
      throw new ForbiddenException('Invalid credentials');
    }
 
    const userObject = user.toJSON();
    return this.getTokens(userObject.id, userObject.email);
  }
 
  
  async logout(userId: string): Promise<{ message: string }> {
    return { message: `User ${userId} logged out` };
  }
 
  
  async refreshTokens(userId: string, refreshToken: string): Promise<Tokens> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new ForbiddenException('Access denied');
    }
 
    const userObject = user.toJSON();
    return this.getTokens(userObject.id, userObject.email);
  }
 
  
  async getTokens(userId: string, email: string): Promise<Tokens> {
    const payload = { sub: userId, email };
 
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || '900s',
    });
 
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
    });
 
    return { accessToken, refreshToken };
  }
}
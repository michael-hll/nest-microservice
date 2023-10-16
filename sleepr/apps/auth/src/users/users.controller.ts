import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { User } from './entities/user.entity.ts/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.gard';

@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: User) {
    return this.userService.getUser(user);
  }
}

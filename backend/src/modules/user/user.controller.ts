import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/config/jwt.auth.guard';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { EditUserDTO } from 'src/dto/edit-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<UserEntity[]> {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getOneUser(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.getOneUser(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(user);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number): void {
    this.userService.deleteUser(id);
  }

  @Put('/:id')
  editUser(@Param('id') id: number, @Body() user: EditUserDTO): Promise<UserEntity> {
    return this.userService.editUser(id, user);
  }
}

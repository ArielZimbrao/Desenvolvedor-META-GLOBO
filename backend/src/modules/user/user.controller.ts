import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/config/jwt.auth.guard';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { EditUserDTO } from 'src/dto/edit-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { AccessLevelEnum } from 'src/enum/access-leval.enum';
import { RoleInterceptor } from 'src/util/roles.interceptor';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UseInterceptors(
  new RoleInterceptor([
    AccessLevelEnum.ADMIN
  ])
)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({
    type: UserEntity,
    isArray: true
  })
  @ApiOperation({
    summary: 'Get all users Endpoint',
    description: 'Get endpoint to list all users from the system'
  })
  getUsers(): Promise<UserEntity[]> {
    return this.userService.getUsers();
  }

  @Get('/:id')
  @ApiOkResponse({
    type: UserEntity,
  })
  @ApiOperation({
    summary: 'Get user Endpoint',
    description: 'Get endpoint to get a user from the system'
  })
  getOneUser(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.getOneUser(id);
  }

  @Post()
  @ApiOkResponse({
    type: UserEntity,
    status: 201
  })
  @ApiOperation({
    summary: 'Create user Endpoint',
    description: 'Post endpoint to create a new user to the system'
  })
  createUser(@Body() user: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(user);
  }

  @Delete('/:id')
  @ApiOkResponse()
  @ApiOperation({
    summary: 'Delete user Endpoint',
    description: 'Delete endpoint to remove a user to the system'
  })
  deleteUser(@Param('id') id: number): void {
    this.userService.deleteUser(id);
  }

  @Put('/:id')
  @ApiOkResponse({
    type: UserEntity,
  })
  @ApiOperation({
    summary: 'Edit user Endpoint',
    description: 'Put endpoint to edit a user to the system'
  })
  editUser(@Param('id') id: number, @Body() user: EditUserDTO): Promise<UserEntity> {
    return this.userService.editUser(id, user);
  }
}

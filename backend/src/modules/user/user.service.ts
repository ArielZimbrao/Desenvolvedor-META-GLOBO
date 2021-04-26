import { Injectable } from '@nestjs/common';
import { cryptoUtils } from 'src/util/crypto.utils';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { EditUserDTO } from 'src/dto/edit-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { AccessLevelEnum } from 'src/enum/access-leval.enum';
import { UserAlreadyExistsError, UserNotFoundError } from 'src/exception/exception';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getOneUser(id: number): Promise<UserEntity> {
    return this.userRepository.findOneById(id)
  }

  async createUser(new_user: CreateUserDTO): Promise<UserEntity> {
    const userold = await this.userRepository.userAlreadyExists(new_user.email)

    if (userold) {
      throw new UserAlreadyExistsError();
    }

    const user = new UserEntity();    
    user.email = new_user.email;
    user.role = AccessLevelEnum[new_user.role];
    user.password = cryptoUtils.decryptoPassword(new_user.password);

    return user.save();
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    user.remove();
  }

  async editUser(id: number, user: EditUserDTO): Promise<UserEntity> {
    const userold = await this.userRepository.findOneById(id);

    if (!userold) {
      throw new UserNotFoundError();
    }

    if (user.email) {
      userold.email = user.email;
    }

    if(user.password) {
      userold.password = cryptoUtils.decryptoPassword(user.password);
    }

    if(user.role) {
      userold.role = AccessLevelEnum[user.role]
    }

    return userold.save();
  }
}

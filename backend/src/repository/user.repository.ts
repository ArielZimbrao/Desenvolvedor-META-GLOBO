
import { UserEntity } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    async findAll() {
        return this.find({
            order: {
                email: 'ASC'
            }
        })
    }

    async findOneById(id: number) {
        return this.findOne({
            where: {
                id: id
            }
        })
    }


    async userAlreadyExists(email: string) {
        console.log(email)
        return this.findOne({
            where: {
                email: email
            }
        })
    }
}

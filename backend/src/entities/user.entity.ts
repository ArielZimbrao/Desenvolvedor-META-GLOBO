import { AccessLevelEnum } from "src/enum/access-leval.enum";
import { cryptoUtils } from "src/util/crypto.utils";
import { AfterLoad, BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {
        length: 100,
        nullable: false,
    })
    email: string;

    @Column('varchar', {
        length: 100,
        nullable: false,
    })
    password: string;

    @Column({ nullable: false, enum: AccessLevelEnum })
    role: AccessLevelEnum;

    @BeforeInsert()
    @BeforeUpdate()
    async generatePasswordHash(): Promise<void> {
      this.password = await cryptoUtils.hash(this.password);
    }
}
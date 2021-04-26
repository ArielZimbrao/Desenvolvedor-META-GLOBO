import { AccessLevelEnum } from "src/enum/access-leval.enum";
import { cryptoUtils } from 'src/util/crypto.utils';
import {MigrationInterface, QueryRunner} from "typeorm";

export class insertUser1619458506713 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const defaultUser = [
            {
                email: 'usarioadm@teste.com.br',
                role: AccessLevelEnum.ADMIN,
                password: await cryptoUtils.hash('pass123')
            },
            {
                email: 'usuariocomum@teste.com.br',
                role: AccessLevelEnum.EMPLOYEE,
                password: await cryptoUtils.hash('pass123')
            }
        ];

        defaultUser.forEach(async (user) => {
            await queryRunner.query(`
                INSERT INTO "user" ("email", "password", "role")
                VALUES ('${user.email}', '${user.password}', '${user.role}')
            `);
        });
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

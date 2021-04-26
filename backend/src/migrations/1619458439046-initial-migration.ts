import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1619458439046 implements MigrationInterface {
    name = 'initialMigration1619458439046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

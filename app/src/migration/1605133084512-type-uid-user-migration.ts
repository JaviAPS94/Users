import {MigrationInterface, QueryRunner} from "typeorm";

export class typeUidUserMigration1605133084512 implements MigrationInterface {
    name = 'typeUidUserMigration1605133084512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `type` enum ('NORMAL', 'DEPENDENT') NOT NULL DEFAULT 'NORMAL'");
        await queryRunner.query("ALTER TABLE `user` CHANGE `uid` `uid` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `uid` `uid` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `type`");
    }

}

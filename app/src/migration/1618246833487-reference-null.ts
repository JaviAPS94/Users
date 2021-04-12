import {MigrationInterface, QueryRunner} from "typeorm";

export class referenceNull1618246833487 implements MigrationInterface {
    name = 'referenceNull1618246833487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shipping_address` DROP COLUMN `reference`");
        await queryRunner.query("ALTER TABLE `shipping_address` ADD `reference` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shipping_address` ADD `reference` text NOT NULL");
    }

}

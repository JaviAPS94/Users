import {MigrationInterface, QueryRunner} from "typeorm";

export class shippingMigration1603673889985 implements MigrationInterface {
    name = 'shippingMigration1603673889985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shipping_address` DROP COLUMN `addressReference`");
        await queryRunner.query("ALTER TABLE `shipping_address` DROP COLUMN `contactPhoneNumber`");
        await queryRunner.query("ALTER TABLE `shipping_address` ADD `reference` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `shipping_address` ADD `numberContactAddress` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shipping_address` DROP COLUMN `numberContactAddress`");
        await queryRunner.query("ALTER TABLE `shipping_address` DROP COLUMN `reference`");
        await queryRunner.query("ALTER TABLE `shipping_address` ADD `contactPhoneNumber` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `shipping_address` ADD `addressReference` varchar(255) NOT NULL");
    }

}

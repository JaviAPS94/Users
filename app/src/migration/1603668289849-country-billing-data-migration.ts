import {MigrationInterface, QueryRunner} from "typeorm";

export class countryBillingDataMigration1603668289849 implements MigrationInterface {
    name = 'countryBillingDataMigration1603668289849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `billing_data` ADD `country` json NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `billing_data` DROP COLUMN `country`");
    }

}

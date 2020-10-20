import {MigrationInterface, QueryRunner} from "typeorm";

export class livingPlaceCountryMigration1603205919262 implements MigrationInterface {
    name = 'livingPlaceCountryMigration1603205919262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `living_place` ADD `active` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `living_place` ADD `countryId` int NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `living_place` DROP COLUMN `countryId`");
        await queryRunner.query("ALTER TABLE `living_place` DROP COLUMN `active`");
    }

}

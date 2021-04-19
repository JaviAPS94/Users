import {MigrationInterface, QueryRunner} from "typeorm";

export class referenceNull1618246833487 implements MigrationInterface {
    name = 'referenceNull1618246833487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shipping_address` CHANGE `reference` `reference` text NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shipping_address` CHANGE `reference` `reference` text NOT NULL");
    }

}

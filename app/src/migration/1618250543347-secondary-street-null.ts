import {MigrationInterface, QueryRunner} from "typeorm";

export class secondaryStreetNull1618250543347 implements MigrationInterface {
    name = 'secondaryStreetNull1618250543347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shipping_address` CHANGE `secondaryStreet` `secondaryStreet` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shipping_address` CHANGE `secondaryStreet` `secondaryStreet` varchar(255) CHARACTER SET \"latin1\" COLLATE \"latin1_swedish_ci\" NOT NULL");
    }

}

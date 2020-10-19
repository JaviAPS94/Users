import {MigrationInterface, QueryRunner} from "typeorm";

export class testsMigration1602887663860 implements MigrationInterface {
    name = 'testsMigration1602887663860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `billing_data` DROP FOREIGN KEY `FK_dad459c6c1f7aeec2f3619ecded`");
        await queryRunner.query("ALTER TABLE `billing_data` CHANGE `userId` `userId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `billing_data` ADD CONSTRAINT `FK_dad459c6c1f7aeec2f3619ecded` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `billing_data` DROP FOREIGN KEY `FK_dad459c6c1f7aeec2f3619ecded`");
        await queryRunner.query("ALTER TABLE `billing_data` CHANGE `userId` `userId` int NULL");
        await queryRunner.query("ALTER TABLE `billing_data` ADD CONSTRAINT `FK_dad459c6c1f7aeec2f3619ecded` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}

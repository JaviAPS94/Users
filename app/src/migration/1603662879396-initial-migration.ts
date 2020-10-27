import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1603662879396 implements MigrationInterface {
    name = 'initialMigration1603662879396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `document` (`id` int NOT NULL AUTO_INCREMENT, `document` varchar(255) NOT NULL, `documentType` enum ('CI', 'RUC', 'PASSWORD') NOT NULL, `accountId` int NOT NULL, `countryId` int NOT NULL, `userId` int NOT NULL, `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteAt` timestamp(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `shipping_address` (`id` int NOT NULL AUTO_INCREMENT, `nickname` varchar(255) NULL, `zone` json NULL, `country` json NULL, `city` json NULL, `sector` json NULL, `default` tinyint NULL, `lat` decimal(16,13) NULL, `lng` decimal(16,13) NULL, `addressByGoogle` varchar(255) NULL, `mainStreet` varchar(255) NOT NULL, `number` varchar(255) NOT NULL, `secondaryStreet` varchar(255) NOT NULL, `addressReference` varchar(255) NOT NULL, `livingPlace` json NOT NULL, `contactPhoneNumber` varchar(255) NULL, `validated` tinyint NULL, `zipCode` varchar(255) NULL, `externalId` varchar(255) NULL, `userId` int NOT NULL, `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteAt` timestamp(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `uid` varchar(255) NOT NULL, `accountId` int NOT NULL, `vendorId` int NULL, `externalId` varchar(255) NULL, `name` varchar(255) NOT NULL, `middleName` varchar(255) NULL, `lastname` varchar(255) NOT NULL, `secondLastname` varchar(255) NULL, `nickname` varchar(255) NULL, `normalizedName` varchar(255) NULL, `email` varchar(255) NOT NULL, `emailType` varchar(255) NULL, `additionalEmail` json NULL, `phone` json NOT NULL, `additionalPhone` json NULL, `code` varchar(255) NOT NULL, `maritalStatus` enum ('SINGLE', 'MARRIED', 'DIVORCED', 'SEPARATED', 'COHABITATING', 'WIDOWED', 'WIDOWER') NULL, `genre` enum ('MALE', 'FEMALE') NULL, `facebookId` json NULL, `whatsappId` json NULL, `additionalInfo` json NULL, `active` tinyint NOT NULL DEFAULT 1, `birthdate` date NULL, `origin` varchar(255) NULL, `lastDateOfActivity` timestamp NULL, `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteAt` timestamp(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `billing_data` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NULL, `address` varchar(255) NULL, `default` tinyint NULL, `document` varchar(255) NULL, `documentType` enum ('CI', 'RUC', 'PASSWORD') NULL, `nickname` varchar(255) NULL, `additionalInfo` json NULL, `email` varchar(255) NULL, `phone` varchar(255) NULL, `externalId` varchar(255) NULL, `userId` int NOT NULL, `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteAt` timestamp(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `living_place` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `active` tinyint NOT NULL, `fields` json NOT NULL, `countryId` int NOT NULL, `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteAt` timestamp(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `property` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `accountId` int NOT NULL, `vendorId` int NULL, `countryId` int NOT NULL, `entity` varchar(255) NOT NULL, `rules` json NULL, `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteAt` timestamp(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `document` ADD CONSTRAINT `FK_7424ddcbdf1e9b067669eb0d3fd` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `shipping_address` ADD CONSTRAINT `FK_2aa99b101de6fb5f3089bd4b7a9` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `billing_data` ADD CONSTRAINT `FK_dad459c6c1f7aeec2f3619ecded` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `billing_data` DROP FOREIGN KEY `FK_dad459c6c1f7aeec2f3619ecded`");
        await queryRunner.query("ALTER TABLE `shipping_address` DROP FOREIGN KEY `FK_2aa99b101de6fb5f3089bd4b7a9`");
        await queryRunner.query("ALTER TABLE `document` DROP FOREIGN KEY `FK_7424ddcbdf1e9b067669eb0d3fd`");
        await queryRunner.query("DROP TABLE `property`");
        await queryRunner.query("DROP TABLE `living_place`");
        await queryRunner.query("DROP TABLE `billing_data`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `shipping_address`");
        await queryRunner.query("DROP TABLE `document`");
    }

}

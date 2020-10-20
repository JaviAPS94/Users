import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1603136475798 implements MigrationInterface {
    name = 'initialMigration1603136475798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `shipping_address` (`id` int NOT NULL AUTO_INCREMENT, `nickname` varchar(255) NULL, `zone` json NULL, `country` json NULL, `city` json NULL, `sector` json NULL, `default` tinyint NULL, `lat` decimal(16,13) NULL, `lng` decimal(16,13) NULL, `addressByGoogle` varchar(255) NULL, `mainStreet` varchar(255) NOT NULL, `number` varchar(255) NOT NULL, `secondaryStreet` varchar(255) NOT NULL, `addressReference` varchar(255) NOT NULL, `livingPlace` json NOT NULL, `contactPhoneNumber` varchar(255) NULL, `validated` tinyint NULL, `zipCode` varchar(255) NULL, `externalId` varchar(255) NULL, `userId` int NOT NULL, `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteAt` timestamp(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `property` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `accountId` int NOT NULL, `vendorId` int NOT NULL, `rules` json NULL, `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteAt` timestamp(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_has_properties` (`id` int NOT NULL AUTO_INCREMENT, `value` varchar(255) NOT NULL, `userId` int NULL, `propertyId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `uid` varchar(255) NOT NULL, `accountId` int NOT NULL, `vendorId` int NOT NULL, `externalId` varchar(255) NULL, `firstName` varchar(255) NOT NULL, `middleName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `secondLastName` varchar(255) NOT NULL, `nickName` varchar(255) NULL, `normalizedName` varchar(255) NULL, `email` varchar(255) NOT NULL, `additionalEmail` json NULL, `phone` varchar(255) NOT NULL, `additionalPhone` json NULL, `code` varchar(255) NOT NULL, `document` varchar(255) NOT NULL, `documentType` enum ('CI', 'RUC', 'PASSWORD') NOT NULL, `maritalStatus` enum ('SINGLE', 'MARRIED', 'DIVORCED', 'SEPARATED', 'COHABITATING', 'WIDOWED', 'WIDOWER') NOT NULL, `genre` enum ('MALE', 'FEMALE') NOT NULL, `facebookId` json NULL, `whatsappId` json NULL, `additionalInfo` json NULL, `active` tinyint NOT NULL, `birthdate` date NULL, `registeredPlatform` varchar(255) NULL, `lastDateOfActivity` timestamp NULL, `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteAt` timestamp(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `billing_data` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NULL, `address` varchar(255) NULL, `default` tinyint NULL, `document` varchar(255) NULL, `documentType` enum ('CI', 'RUC', 'PASSWORD') NULL, `nickname` varchar(255) NULL, `additionalInfo` json NULL, `email` varchar(255) NULL, `phone` varchar(255) NULL, `externalId` varchar(255) NULL, `userId` int NOT NULL, `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteAt` timestamp(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `living_place` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `fields` json NOT NULL, `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteAt` timestamp(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `shipping_address` ADD CONSTRAINT `FK_2aa99b101de6fb5f3089bd4b7a9` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_has_properties` ADD CONSTRAINT `FK_50793c7a54d0bd8ba72d762eaf1` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_has_properties` ADD CONSTRAINT `FK_19e788623394bc3c1f9c5e434fe` FOREIGN KEY (`propertyId`) REFERENCES `property`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `billing_data` ADD CONSTRAINT `FK_dad459c6c1f7aeec2f3619ecded` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `billing_data` DROP FOREIGN KEY `FK_dad459c6c1f7aeec2f3619ecded`");
        await queryRunner.query("ALTER TABLE `user_has_properties` DROP FOREIGN KEY `FK_19e788623394bc3c1f9c5e434fe`");
        await queryRunner.query("ALTER TABLE `user_has_properties` DROP FOREIGN KEY `FK_50793c7a54d0bd8ba72d762eaf1`");
        await queryRunner.query("ALTER TABLE `shipping_address` DROP FOREIGN KEY `FK_2aa99b101de6fb5f3089bd4b7a9`");
        await queryRunner.query("DROP TABLE `living_place`");
        await queryRunner.query("DROP TABLE `billing_data`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `user_has_properties`");
        await queryRunner.query("DROP TABLE `property`");
        await queryRunner.query("DROP TABLE `shipping_address`");
    }

}

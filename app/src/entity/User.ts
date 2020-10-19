import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { documentType } from "../users/enums/document-type.enum";
import { genre } from "../users/enums/genre.enum";
import { maritalStatus } from "../users/enums/marital-status.enum";
import { BillingData } from "./BillingData";
import { ShippingAddress } from "./ShippingAddress";
import { UserHasProperties } from "./UserHasProperties";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  uid: string;

  @Column({ nullable: false })
  accountId: number;

  @Column({ nullable: false })
  vendorId: number;

  @Column({ nullable: true })
  externalId: string;

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  secondLastName: string;

  @Column({ nullable: true })
  nickName: string;

  @Column({ nullable: true })
  normalizedName: string;

  @Column()
  email: string;

  @Column("json", { nullable: true })
  additionalEmail: any;

  @Column()
  phone: string;

  @Column("json", { nullable: true })
  additionalPhone: any;

  @Column()
  code: string;

  @Column()
  document: string;

  @Column("enum", { enum: documentType })
  documentType: documentType;

  @Column("enum", { enum: maritalStatus })
  maritalStatus: maritalStatus;

  @Column("enum", { enum: genre })
  genre: genre;

  @Column("json", { nullable: true })
  facebookId: any;

  @Column("json", { nullable: true })
  whatsappId: any;

  @Column("json", { nullable: true })
  additionalInfo: any;

  @Column("tinyint")
  active: number;

  @Column({ type: "date", nullable: true })
  birthdate: Date;

  @Column({ nullable: true })
  registeredPlatform: string;

  @Column({ type: "timestamp", nullable: true })
  lastDateOfActivity: Date;

  @CreateDateColumn({ type: "timestamp", nullable: true, select: true })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true, select: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true, select: true })
  deleteAt: Date;

  @OneToMany(type => BillingData, billingDataByUser => billingDataByUser.user)
  billingDataByUser: BillingData[];

  @OneToMany(type => ShippingAddress, shippingAddressByUser => shippingAddressByUser.user)
  shippingAddressByUser: ShippingAddress[];

  @OneToMany(type => UserHasProperties, userHasProperties => userHasProperties.user)
  userHasProperties: UserHasProperties[];
}

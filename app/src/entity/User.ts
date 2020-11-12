import { userType } from "../users/enums/user-type.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { gender } from "../users/enums/gender.enum";
import { maritalStatus } from "../users/enums/marital-status.enum";
import { BillingData } from "./BillingData";
import { Document } from "./Document";
import { ShippingAddress } from "./ShippingAddress";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  uid: string;

  @Column({ nullable: false })
  accountId: number;

  @Column({ nullable: true })
  vendorId: number;

  @Column({ nullable: true })
  externalId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  lastname: string;

  @Column({ nullable: true })
  secondLastname: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  normalizedName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  emailType: string;

  @Column("json", { nullable: true })
  additionalEmail: any;

  @Column("json", { nullable: false })
  phone: any;

  @Column("json", { nullable: true })
  additionalPhone: any;

  @Column()
  code: string;

  @Column("enum", { enum: maritalStatus, nullable: true })
  maritalStatus: maritalStatus;

  @Column("enum", { enum: gender, nullable: true })
  gender: gender;

  @Column("json", { nullable: true })
  facebookId: any;

  @Column("json", { nullable: true })
  whatsappId: any;

  @Column("json", { nullable: true })
  additionalInfo: any;

  @Column("tinyint", { default: 1 })
  active: number;

  @Column({ type: "date", nullable: true })
  birthdate: Date;

  @Column({ nullable: true })
  origin: string;

  @Column({ type: "timestamp", nullable: true })
  lastDateOfActivity: Date;

  @Column("enum", { enum: userType, nullable: false, default: userType.NORMAL })
  type: userType;

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

  @OneToMany(type => Document, documents => documents.user)
  documentByUser: Document[];
}

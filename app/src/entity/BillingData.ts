import { documentType } from "../users/enums/document-type.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class BillingData {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string | null;

  @Column({ nullable: true })
  address: string;

  @Column({ type: "tinyint", nullable: true })
  default: number;

  @Column({ nullable: true })
  document: string;

  @Column({ type: "enum", enum: documentType, nullable: true })
  documentType: documentType;

  @Column({ nullable: true })
  nickname: string;

  @Column({ type: "json", nullable: true })
  country: JSON;

  @Column({ type: "json", nullable: true })
  additionalInfo: JSON;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  externalId: string;

  @Column({ nullable: false })
  userId: number;

  @CreateDateColumn({ type: "timestamp", nullable: true, select: true })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true, select: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true, select: true })
  deleteAt: Date;

  @ManyToOne(type => User, user => user.billingDataByUser)
  user: User;
}

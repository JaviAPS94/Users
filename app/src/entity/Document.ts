import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { documentType } from "../users/enums/document-type.enum";
import { User } from "./User";

@Entity()
export class Document {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  document: string;

  @Column("enum", { enum: documentType })
  documentType: documentType;

  @Column({ nullable: false })
  accountId: number;

  @Column({ nullable: false })
  countryId: number;

  @Column({ nullable: false })
  userId: number;

  @CreateDateColumn({ type: "timestamp", nullable: true, select: true })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true, select: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true, select: true })
  deleteAt: Date;

  @ManyToOne(type => User, user => user.documentByUser)
  user: User;
}
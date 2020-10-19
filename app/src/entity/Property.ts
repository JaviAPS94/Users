import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserHasProperties } from "./UserHasProperties";

@Entity()
export class Property {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  accountId: number;

  @Column({ nullable: false })
  vendorId: number;

  @Column("json", { nullable: true })
  rules: any;

  @CreateDateColumn({ type: "timestamp", nullable: true, select: true })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true, select: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true, select: true })
  deleteAt: Date;

  @OneToMany(type => UserHasProperties, userHasProperties => userHasProperties.property)
  userHasProperties: UserHasProperties[];
}
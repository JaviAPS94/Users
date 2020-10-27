import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class ShippingAddress {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nickname: string;

  @Column({ type: "json", nullable: true })
  zone: JSON;

  @Column({ type: "json", nullable: true })
  country: JSON;

  @Column({ type: "json", nullable: true })
  city: JSON;

  @Column({ type: "json", nullable: true })
  sector: JSON;

  @Column({ type: "tinyint", nullable: true })
  default: number;

  @Column({ type: "decimal", nullable: true, precision: 16, scale: 13 })
  lat: number;

  @Column({ type: "decimal", nullable: true, precision: 16, scale: 13 })
  lng: number;

  @Column({ nullable: true })
  addressByGoogle: string;

  @Column({ nullable: false })
  mainStreet: string;

  @Column({ nullable: false })
  number: string;

  @Column({ nullable: false })
  secondaryStreet: string;

  @Column({ nullable: false })
  reference: string;

  @Column({ type: "json", nullable: false })
  livingPlace: JSON;

  @Column({ nullable: true })
  numberContactAddress: string;

  @Column({ type: "tinyint", nullable: true })
  validated: number;

  @Column({ nullable: true })
  zipCode: string;

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

  @ManyToOne(type => User, user => user.shippingAddressByUser)
  user: User;
}

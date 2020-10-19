import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class ShippingAddress {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nickname: string;

  @Column({ type: "json", nullable: false })
  zone: JSON;

  @Column({ type: "json", nullable: false })
  country: JSON;

  @Column({ type: "json", nullable: false })
  city: JSON;

  @Column({ type: "json", nullable: false })
  sector: JSON;

  @Column({ type: "tinyint", nullable: false })
  default: number;

  @Column({ type: "decimal", nullable: true, precision: 16, scale: 13 })
  lat: number;

  @Column({ type: "decimal", nullable: true, precision: 16, scale: 13 })
  lng: number;

  @Column({ nullable: false })
  mainStreet: string;

  @Column({ nullable: false })
  number: string;

  @Column({ nullable: false })
  secondaryStreet: string;

  @Column({ nullable: false })
  addressReference: string;

  @Column({ type: "json", nullable: true })
  livingPlace: JSON;

  @Column({ nullable: true })
  contactPhoneNumber: string;

  @Column({ type: "tinyint", nullable: false })
  validated: number;

  @Column({ nullable: true })
  zipCode: string;

  @Column({ nullable: true })
  externalId: string;

  @CreateDateColumn({ type: "timestamp", nullable: true, select: true })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true, select: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true, select: true })
  deleteAt: Date;

  @ManyToOne(type => User, user => user.shippingAddressByUser)
  user: User;
}

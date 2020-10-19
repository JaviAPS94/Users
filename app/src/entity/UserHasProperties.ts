import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./Property";
import { User } from "./User";

@Entity()
export class UserHasProperties {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(type => User, user => user.userHasProperties)
  user: User;

  @ManyToOne(type => Property, property => property.userHasProperties)
  property: Property;
}
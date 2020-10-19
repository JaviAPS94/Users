import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class LivingPlace {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: "json", nullable: false })
  fields: JSON;

  @CreateDateColumn({ type: "timestamp", nullable: true, select: true })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true, select: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true, select: true })
  deleteAt: Date;

}

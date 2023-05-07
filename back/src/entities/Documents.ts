import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Documents {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  label: string;

  @Column()
  url: string;

  @Column()
  cloudinaryPublicUrl: string;

  @Column()
  createdDate?: Date;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_name!: string;

  @Column()
  speed!: number;

  @Column()
  points!: number;
}

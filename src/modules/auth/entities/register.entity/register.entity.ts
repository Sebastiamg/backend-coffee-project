import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RegisterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  status: boolean;
}

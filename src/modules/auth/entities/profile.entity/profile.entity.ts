import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column({ nullable: true })
  surname: string;

  @Column('int')
  phone: number;

  @Column()
  photo: string;
}

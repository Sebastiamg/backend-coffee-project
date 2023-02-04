import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from '../profile.entity/profile.entity';

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

  @OneToOne(() => ProfileEntity, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'user_profile' })
  profile: ProfileEntity;
}

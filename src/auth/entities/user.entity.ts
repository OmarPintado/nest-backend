import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column('text', {
    select: false,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column('text')
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @BeforeInsert()
  checkEmailBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkEmailBeforeUpdate() {
    this.checkEmailBeforeInsert();
  }
}

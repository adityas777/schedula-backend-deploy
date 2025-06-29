import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Provider { LOCAL = 'local', GOOGLE = 'google' }
export enum Role { DOCTOR = 'doctor', PATIENT = 'patient' }

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ unique: true }) email: string;
  @Column() name: string;
  @Column({ nullable: true }) password: string;
  @Column({ type: 'enum', enum: Provider }) provider: Provider;
  @Column({ type: 'enum', enum: Role }) role: Role;
}

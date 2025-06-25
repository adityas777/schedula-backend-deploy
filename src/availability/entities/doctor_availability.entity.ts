import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('doctor_availabilities')
export class DoctorAvailability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doctorId: number;

  @Column()
  date: string;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @Column({ nullable: true })
  session: string;
}

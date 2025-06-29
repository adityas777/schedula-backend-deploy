import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { DoctorAvailability } from './entities/doctor_availability.entity';
import { DoctorTimeSlot } from './entities/doctor_time_slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorAvailability, DoctorTimeSlot])],
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
})
export class AvailabilityModule {}

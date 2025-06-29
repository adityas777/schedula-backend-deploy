import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorAvailability } from './entities/doctor_availability.entity';
import { DoctorTimeSlot } from './entities/doctor_time_slot.entity';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(DoctorAvailability)
    private availabilityRepo: Repository<DoctorAvailability>,
    @InjectRepository(DoctorTimeSlot)
    private timeSlotRepo: Repository<DoctorTimeSlot>
  ) {}

  async setAvailability(doctorId: number, dto: CreateAvailabilityDto) {
    const { date, start_time, end_time, session } = dto;
    const availabilityDate = new Date(date);

    if (availabilityDate < new Date()) {
      throw new BadRequestException('Date cannot be in the past');
    }

    const existing = await this.availabilityRepo.findOne({ where: { doctorId, date } });
    if (existing) {
      throw new ConflictException('Availability already set for this date');
    }

    const availability = this.availabilityRepo.create({ doctorId, ...dto });
    await this.availabilityRepo.save(availability);

    const start = new Date(`${date}T${start_time}`);
    const end = new Date(`${date}T${end_time}`);
    const slots = [];

    while (start < end) {
      const next = new Date(start.getTime() + 30 * 60 * 1000);
      if (await this.timeSlotRepo.findOne({ where: { doctorId, date, start_time: start.toISOString().slice(11, 16) } })) {
        throw new ConflictException('Duplicate slot exists');
      }

      slots.push(this.timeSlotRepo.create({
        doctorId,
        date,
        start_time: start.toISOString().slice(11, 16),
        end_time: next.toISOString().slice(11, 16),
        is_available: true
      }));
      start.setTime(next.getTime());
    }

    return this.timeSlotRepo.save(slots);
  }

  async getAvailability(doctorId: number, page: number, limit: number) {
    const [data, total] = await this.timeSlotRepo.findAndCount({
      where: { doctorId, is_available: true },
      order: { date: 'ASC', start_time: 'ASC' },
      skip: (page - 1) * limit,
      take: limit
    });

    return { total, page, limit, data };
  }
}

import { Controller, Post, Get, Param, Body, Query, UseGuards, Request } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator'; // File 'c:/Users/91786/Desktop/pearl-thoughts/TASK 6/src/auth/guards/jwt-auth.guard.ts' is not a module.
import { RolesGuard } from '../common/guards/roles.guard';
import { Role } from 'src/common/constraints/roles.enum';

@Controller('doctors/:id/availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Doctor)
  @Post()
  async setAvailability(@Param('id') doctorId: string, @Body() dto: CreateAvailabilityDto) {
    return this.availabilityService.setAvailability(+doctorId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Patient)
  @Get()
  async getAvailability(
    @Param('id') doctorId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.availabilityService.getAvailability(+doctorId, page, limit);
  }
}

import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateAvailabilityDto {
  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  start_time: string;

  @IsString()
  @IsNotEmpty()
  end_time: string;

  @IsString()
  session: string; // Morning or Evening
}

import { Type } from "class-transformer";
import { IsDate, IsDateString, IsString } from "class-validator";

export class CreateReservationDto {

  @IsDate()
  @Type(() => Date)
  start_date: Date;

  @IsDate()
  @Type(() => Date)
  end_date: Date;

  @IsString()
  place_id: string;

  @IsString()
  invoice_id: string;
}

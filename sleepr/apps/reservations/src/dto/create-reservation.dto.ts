import { CreateChargeDto } from "@app/common/dto/create-charge.dto";
import { Type } from "class-transformer";
import { IsDate, IsDefined, IsString, ValidateNested } from "class-validator";

export class CreateReservationDto {

  @IsDate()
  @Type(() => Date)
  start_date: Date;

  @IsDate()
  @Type(() => Date)
  end_date: Date;

  @IsDefined()
  @ValidateNested()
  charge: CreateChargeDto;
}

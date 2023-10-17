import Stripe from "stripe";
import { CardDto } from "./card.dto";
import { IsDefined, IsNumber, ValidateNested } from "class-validator";

export class CreateChargeDto {
  @IsDefined()
  @ValidateNested()
  card: CardDto;

  @IsNumber()
  amount: number;
}
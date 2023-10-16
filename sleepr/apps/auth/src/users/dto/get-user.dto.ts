import { IsString } from "class-validator";

export class GetUserDto {
  @IsString()
  email: string;
}
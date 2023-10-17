import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard } from '@app/common/auth/jwt-auth.guard';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { UserDto } from '@app/common/dto/user.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createReservationDto: CreateReservationDto,
  @CurrentUser() user: UserDto
  ) {
    try{
      return this.reservationsService.create(createReservationDto, user.email);  
    }catch(err){
      throw new BadRequestException(err);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    console.log('node evn:', process.env.NODE_ENV);
    return this.reservationsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }
}

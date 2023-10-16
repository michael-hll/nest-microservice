import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReservationsService {

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
  ) { }

  create(createReservationDto: CreateReservationDto) {
    const reservation = this.reservationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      user_id: '123',
    });
    return this.reservationsRepository.save(reservation);
  }

  findAll() {
    return this.reservationsRepository.find();
  }

  findOne(id: number) {
    return this.reservationsRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.reservationsRepository.findOne({where: {id}});
    if(!reservation){
      throw new BadRequestException('reservation not found');
    }
    Object.assign(reservation, updateReservationDto);
    return this.reservationsRepository.save(reservation);
  }

  async remove(id: number) {
    const reservation = await this.reservationsRepository.findOne({where: {id}});
    if(!reservation){
      throw new BadRequestException('reservation not found');
    }
    return this.reservationsRepository.remove(reservation);
  }
}

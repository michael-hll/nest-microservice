import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PAYMENTS_SERVICE } from '@app/common/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
    @Inject(PAYMENTS_SERVICE)
    private readonly paymentService: ClientProxy,
  ) { }

  async create(createReservationDto: CreateReservationDto, userId: string) {
    return await this.paymentService
      .send('create_charge', {
        ...createReservationDto.charge,
        email: userId,
      })
      .pipe(
        map(async (res) => {
          const reservation = await this.reservationsRepository.create({
            ...createReservationDto,
            timestamp: new Date(),
            user_id: userId,
            invoice_id: res.id,
          });
          return await this.reservationsRepository.save(reservation);
        },
        ));
  }

  async findAll() {
    return this.reservationsRepository.find();
  }

  async findOne(id: number) {
    return this.reservationsRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.reservationsRepository.findOne({ where: { id } });
    if (!reservation) {
      throw new BadRequestException('reservation not found');
    }
    Object.assign(reservation, updateReservationDto);
    return this.reservationsRepository.save(reservation);
  }

  async remove(id: number) {
    const reservation = await this.reservationsRepository.findOne({ where: { id } });
    if (!reservation) {
      throw new BadRequestException('reservation not found');
    }
    return this.reservationsRepository.remove(reservation);
  }
}

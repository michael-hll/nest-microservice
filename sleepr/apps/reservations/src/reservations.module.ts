import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule } from '@app/common/database/database.module';
import { Reservation } from './entities/reservation.entity';
import { LoggerModule } from '@app/common/logger/logger.module';


@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([Reservation]),    
    LoggerModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {} 

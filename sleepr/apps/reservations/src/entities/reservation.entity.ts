import { IsDateString, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' }) 
  timestamp: Date;

  @Column({ type: 'timestamptz' }) 
  start_date: Date;

  @Column({ type: 'timestamptz' }) 
  end_date: Date;

  @Column()
  user_id: string;

  @Column()
  place_id: string;

  @Column()
  invoice_id: string;
}

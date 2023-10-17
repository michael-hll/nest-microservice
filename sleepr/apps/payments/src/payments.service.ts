import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { NOTIFICATIONS_SERVICE } from '@app/common/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { CreateChargeDto } from '@app/common/dto/create-charge.dto';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(this.configService.get('STRIPE_SERECT_KEY'), {
    apiVersion: '2023-10-16',

  });
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE) 
    private readonly notificationService: ClientProxy,
  ) { }

  async createCharge({ amount, email}: PaymentsCreateChargeDto) {
   
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: 'pm_card_visa', // this is a testing card
      amount: amount * 100,
      confirm: true,
      return_url: 'https://www.xxxx.com/payment/results',
      currency: 'usd',
    });
    
    this.notificationService.emit('notify_email', {
      email
    });

    return paymentIntent;
  }
}

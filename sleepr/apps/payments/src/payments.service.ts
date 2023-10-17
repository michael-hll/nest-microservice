import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(this.configService.get('STRIPE_SERECT_KEY'), {
    apiVersion: '2023-10-16',

  });
  constructor(private readonly configService: ConfigService) { }

  async createCharge({ amount }: CreateChargeDto) {
   
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: 'pm_card_visa', // this is a testing card
      amount: amount * 100,
      confirm: true,
      return_url: 'https://www.xxxx.com/payment/results',
      currency: 'usd',
    });

    return paymentIntent;
  }
}

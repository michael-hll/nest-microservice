import { Inject, Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { LoggerModule } from '@app/common/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.required(),
        STRIPE_SERECT_KEY: Joi.required(),
      }),
    }),
    LoggerModule,
  ],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    ConfigService,
  ],
})
export class PaymentsModule { }

import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import * as nodemailer from 'nodemailer';
import { Logger } from 'nestjs-pino';

@Injectable()
export class NotificationsService {
  constructor(private readonly logger: Logger) {}

  private readonly transporter = nodemailer.createTransport({
    service: 'gamil',
    auth: {
      user: 'xxx@gmail.com',
      clientId: 'google oauth client id',
      clientSecret: 'secretxxx',
      refreshToken: 'token',
    }
  });

  async notifyEmail(data: NotifyEmailDto) {
    // TODO: using real email service...
    try{
      await this.transporter.sendMail({
        from: 'xxx',
        to: data.email,
        subject: 'subject',
        text: 'text...',
      })
    }catch(err) {
      this.logger.warn('notification was sent via email with errors: ', err);
    }
    
  }

}
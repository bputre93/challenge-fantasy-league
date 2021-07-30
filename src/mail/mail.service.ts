import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendWeeklyRecapEmail() {
        await this.mailerService.sendMail({
            to: 'brandon.putre@gmail.com',
            subject: 'Test Email',
            template: 'recap',
            context: {
                owner: 'Brandon',
                place: '1st',
                points: 52
            }
        })
    }
}

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendWeeklyRecapEmail() {
        console.log(__dirname)
        await this.mailerService.sendMail({
            to: 'brandon.putre@gmail.com',
            subject: 'Test Email',
            template: 'recap-email',
            context: {
                owner: 'Brandon',
                place: '1st',
                points: 52
            }
        })
    }
}

import { Controller, Post } from "@nestjs/common";
import { MailService } from "./mail.service";

@Controller('mail')
export class MailController {
    constructor(private mailService: MailService) {}

    @Post()
    sendMail(): Promise<void> {
        return this.mailService.sendWeeklyRecapEmail();
    }



}

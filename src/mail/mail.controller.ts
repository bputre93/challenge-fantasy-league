import { Controller, Param, ParseIntPipe, Post } from "@nestjs/common";
import { MailService } from "./mail.service";

@Controller('mail')
export class MailController {
    constructor(private mailService: MailService) {}

    @Post('/:week')
    sendMail(@Param('week', ParseIntPipe) week: number): Promise<void> {
        return this.mailService.sendWeeklyRecapEmail(week);
    }

}

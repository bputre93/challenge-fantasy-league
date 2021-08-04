import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { MailController } from './mail.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.example.com',
        secure: false,
        auth: {
          user: 'user@example.com',
          pass: 'topsecret',
        },
      },
      preview: true,
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: 'Users/brandonputre/Documents/challenge-fantasy-league/dist/mail/templates'/*join(__dirname, './templates')*/,
        adapter: new HandlebarsAdapter(), 
        options: {
          strict: false,
        },
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService], 
})
export class MailModule {}

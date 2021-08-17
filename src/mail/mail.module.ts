import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { MailController } from './mail.controller';
import { TeamsService } from 'src/teams/teams.service';
import { TeamsModule } from 'src/teams/teams.module';
import { TeamRepository } from 'src/teams/team.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreRepository } from 'src/scores/score.repository';
import { ScoresModule } from 'src/scores/scores.module';
import { ScoresService } from 'src/scores/scores.service';
import { ChallengersModule } from 'src/challengers/challengers.module';
import { ScoringModule } from 'src/scoring/scoring.module';
import { ScoringRepository } from 'src/scoring/scoring.repository';
import { ChallengerRepository } from 'src/challengers/challenger.repository';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        secure: true,
        auth: {
          user: 'mae98@ethereal.email',
          pass: 'SvMwbdKaM9F7CS5QrS',
        },
      },
      preview: true,
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, './templates'),
        adapter: new HandlebarsAdapter(), 
        options: {
          strict: false,
        },
      },
    }),
    TypeOrmModule.forFeature([TeamRepository, ScoreRepository, ScoringRepository, ChallengerRepository]),
    TeamsModule,
    ScoresModule,
    ChallengersModule,
    ScoringModule
  ],
  controllers: [MailController],
  providers: [MailService, TeamsService, ScoresService],
  exports: [MailService], 
})
export class MailModule {}

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ScoresService } from 'src/scores/scores.service';
import { TeamsService } from 'src/teams/teams.service';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private teamsService: TeamsService,
        private scoresService: ScoresService
        ) {}

    async sendWeeklyRecapEmail(week: number): Promise<void> {
        return await this.mailerService.sendMail({
            to: 'brandon.putre@gmail.com',
            subject: 'Test Email',
            template: __dirname +'/templates/recap-email',
            context: {
                week: week,
                weeklyTotal: '10',
                teamName: 'Cold Beers and Revenge',
                recap: "This episode sucked",
                topChallenger: 'Devin',
                topChallengerPoints: '14',
                weeklyPlace: '1st',
                overallStandingsTable: await this.teamsService.getStandings(),
                weeklyStandingsTable: await this.scoresService.getStandingsForWeek(week)
            }
        })
        .catch((e) => {
          console.log(e);
        })
    }
    
}

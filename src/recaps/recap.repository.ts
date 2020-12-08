import { EntityRepository, Repository } from "typeorm";
import { CreateRecapDto } from "./dto/create-recap.dto";
import { Recap } from "./recap.entity";

@EntityRepository(Recap)
export class RecapRepository extends Repository<Recap> {
    
    async createRecap(createRecapDto: CreateRecapDto): Promise<Recap> {
        const {week, episodeTitle, writeup, mvp, eliminations, skulls} = createRecapDto;
        const recap = new Recap();
        recap.week = week;
        recap.episodeTitle = episodeTitle;
        recap.writeup = writeup;
        recap.mvp = mvp;
        recap.eliminations = eliminations;
        recap.skulls = skulls
        await recap.save();
        return recap;
    }

    async getWeeks(): Promise<number[]> {
        const weeks = await this.createQueryBuilder('recap')
        .select("recap.week")
        .execute();

        const weeksArr = weeks.map(el => {
            return el.recap_week
        })


        return weeksArr;
    }
}
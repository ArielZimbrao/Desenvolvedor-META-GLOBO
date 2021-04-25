import { HttpService, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { StatsDataDto } from "src/dto/stats-mock.dto";
import { StatusClusterEnum } from "src/enum/status-cluster.enum";

@Injectable()
export class StatsService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.httpService.axiosRef.defaults.baseURL = this.configService.get<string>('STATS_BASE_URL');
    }

    async getCpuStats(): Promise<StatsDataDto[]> {
        try {
            return this.httpService.get('b1bc5162-7cf2-4599-b1f5-e3bd58fcf07f').toPromise().then((result) => {
                const { labels, data } = result.data;
                return this.mountStatsData(labels, data);
            });
        } catch(err) {

        }
    }

    async getMemoryStats(): Promise<StatsDataDto[]> {
        try {
            return this.httpService.get('d23c3262-967e-4567-b7f6-2fd263748811').toPromise().then((result) => {
                const { labels, data } = result.data;
                return this.mountStatsData(labels, data);
            });
        } catch(err) {

        }
    }

    private mountStatsData(labels: string[], data: string[]): StatsDataDto[] {
        let result: StatsDataDto[] = [];

        labels.forEach((label, index) => {
            result.push(new StatsDataDto(label, `${data[index].toString()}%`))
        });

        return result;
    }
    async getClusterStatus(): Promise<StatusClusterEnum> {
        try {
            return this.httpService.get('cab2791c-7c85-4461-b95c-86bc1a12dc72').toPromise().then((result) => {
                const { status } = result.data;
                return StatusClusterEnum[status]
            });
        } catch(err) {

        }
    }

}
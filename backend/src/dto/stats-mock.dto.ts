import { IsNotEmpty, IsString } from "class-validator";

export class StatsDataDto {

    constructor(labels: string[], data: string[]) {
        if (labels) {
            this.labels = labels;
        }

        if (data) {
            this.data = data.map((dt) => {
                return parseInt(dt, 10).toFixed(2)
            });
        }
    }

    @IsNotEmpty()
    @IsString()
    labels: string[]

    @IsNotEmpty()
    @IsString()
    data: string[]
}
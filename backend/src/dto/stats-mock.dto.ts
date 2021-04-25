import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class StatsDataDto {

    constructor(labels: string[], data: string[]) {
        if (labels) {
            this.labels = labels;
        }

        if (data) {
            this.data = data.map((dt) => {
                return `${dt.toString()}%`
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
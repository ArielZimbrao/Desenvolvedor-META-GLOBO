import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class StatsDataDto {

    constructor(label?: string, data?: string) {
        if (label) {
            this.label = label;
        }

        if (data) {
            this.data = data;
        }
    }

    @IsNotEmpty()
    @IsString()
    label: string

    @IsNotEmpty()
    @IsString()
    data: string
}
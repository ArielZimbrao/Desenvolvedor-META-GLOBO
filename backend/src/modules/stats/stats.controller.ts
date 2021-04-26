import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/config/jwt.auth.guard";
import { StatsDataDto } from "src/dto/stats-mock.dto";
import { StatusClusterEnum } from "src/enum/status-cluster.enum";
import { StatsService } from "./stats.service";

@ApiTags('stats')
@Controller('stats')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StatsController {
    constructor(private readonly statsService: StatsService) {}

    @Get('cpu')
    getCpuStats(): Promise<StatsDataDto> {
        return this.statsService.getCpuStats();
    }

    @Get('memory')
    getMemoryStats(): Promise<StatsDataDto> {
        return this.statsService.getMemoryStats();
    }

    @Get('cluster/status')
    getClusterStatus(): Promise<StatusClusterEnum> {
        return this.statsService.getClusterStatus();
    }
}
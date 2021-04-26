import { Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/config/jwt.auth.guard";
import { StatsDataDto } from "src/dto/stats-mock.dto";
import { AccessLevelEnum } from "src/enum/access-leval.enum";
import { StatusClusterEnum } from "src/enum/status-cluster.enum";
import { RoleInterceptor } from "src/util/roles.interceptor";
import { StatsService } from "./stats.service";

@ApiTags('stats')
@Controller('stats')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UseInterceptors(
    new RoleInterceptor([
      AccessLevelEnum.ADMIN,
      AccessLevelEnum.EMPLOYEE
    ])
  )
export class StatsController {
    constructor(private readonly statsService: StatsService) {}

    @Get('cpu')
    @ApiOkResponse({
        type: StatsDataDto,
    })
    @ApiOperation({
        summary: 'Get cpu usage Endpoint',
        description: 'Get endpoint to get a cpu consumed statistics from the cluster'
    })
    getCpuStats(): Promise<StatsDataDto> {
        return this.statsService.getCpuStats();
    }

    @Get('memory')
    @ApiOkResponse({
        type: StatsDataDto,
    })
    @ApiOperation({
        summary: 'Get memory usage Endpoint',
        description: 'Get endpoint to get a memory consumed statistics from the cluster'
    })
    getMemoryStats(): Promise<StatsDataDto> {
        return this.statsService.getMemoryStats();
    }

    @Get('cluster/status')
    @ApiOkResponse()
    @ApiOperation({
        summary: 'Get cpu usage Endpoint',
        description: 'Get endpoint to get a cpu consumed statistics from the cluster'
    })
    getClusterStatus(): Promise<StatusClusterEnum> {
        return this.statsService.getClusterStatus();
    }
}
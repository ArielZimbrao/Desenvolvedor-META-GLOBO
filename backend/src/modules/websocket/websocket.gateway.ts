import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, ConnectedSocket } from '@nestjs/websockets';
import { Server } from 'ws';
import { StatsService } from '../stats/stats.service';

@Injectable()
@WebSocketGateway({ port: 8000, transports: ['websocket'] })
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {


  @WebSocketServer()
  private server: Server;
  wsClients;

  constructor(
    private readonly statsService: StatsService,
  ) {}
  
  afterInit() {
    this.wsClients = [];
    this.server.emit('testing', { do: 'stuff' });
  }

  handleConnection(client: any) {
    this.wsClients.push(client);
  }

  handleDisconnect(client) {
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i] === client) {
        this.wsClients.splice(i, 1);
        break;
      }
    }
    this.broadcast('disconnect',{});
  }
  private broadcast(event, message: any) {
    const broadCastMessage = JSON.stringify({
      event: event,
      message: message,
    });
    for (let c of this.wsClients) {
      c.send(broadCastMessage);
    }
  }



  @Cron(CronExpression.EVERY_SECOND)
  async cronUpdateChartEvent() {
    const cpu = await this.statsService.getCpuStats();
    const memory = await this.statsService.getMemoryStats();
    const clusterStatus = await this.statsService.getClusterStatus();
    this.broadcast('update_cpu_usage', cpu);
    this.broadcast('update_memory_usage', memory);
    this.broadcast('update_cluster_status', clusterStatus);
  }
}
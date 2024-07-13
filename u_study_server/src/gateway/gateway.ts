import { OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { DatabaseService } from 'src/database/database.service';

@WebSocketGateway(3003, {
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class Gateway implements OnModuleInit {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}
  @WebSocketServer()
  server: Server;
  onModuleInit() {
    this.server.on('connection', async (socket) => {
      console.log(socket.id, 'connected');
      this.server.emit('connected', socket.id);
    });
  }
  @SubscribeMessage('newMessage')
  newMessage(
    @MessageBody() body: { title: string; id?: number; content: string },
  ) {
    if (body.id) {
      //
    } else {
      //
    }
  }

  // @SubscribeMessage('write_note')
  // async getInfoNote(
  //   @MessageBody()
  //   body: { title: string; idVideo: number; content: string; idNote: number },
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   try {
  //     const uuid = this.jwtService.verify(client.handshake.auth.token).uuid;
  //     const test = await this.databaseService.notes.upsert({
  //       where: {
  //         uuid_videoId: {
  //           uuid: uuid,
  //           videoId: body.idVideo,
  //         },
  //       },
  //       create: {
  //         uuid: uuid,
  //         videoId: body.idVideo,
  //         title: body.title,
  //         content: body.content,
  //       },
  //       update: {
  //         title: body.title,
  //         content: body.content,
  //       },
  //     });
  //     console.log(test);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  @SubscribeMessage('leanrning_timestamp')
  async setTimeWatchVideo(
    @MessageBody()
    body: {
      videoId: number;
      timeLearned: number;
      completed: boolean;
    },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const uuid = this.jwtService.verify(client.handshake.auth.token).uuid;
      console.log(body.timeLearned);

      if (body.timeLearned !== 0) {
        const res = await this.databaseService.learning.upsert({
          where: {
            videoId_uuid: {
              uuid: uuid,
              videoId: body.videoId,
            },
          },
          update: {
            timeLearned: body.timeLearned,
            // completed: body.completed,
          },
          create: {
            timeLearned: body.timeLearned,
            completed: body.completed,
            user: {
              connect: {
                uuid: uuid,
              },
            },
            video: {
              connect: {
                id: body.videoId,
              },
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

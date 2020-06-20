import { RoomService } from '@mas/server/core/application-services';
import { AudioSourceType, Uuid } from '@mas/server/core/domain';
import { UserRepository } from '@mas/server/core/domain-services';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { LeaveCommand } from '../../../core/application-services/src/lib/room/commands/leave/leave.command';

@WebSocketGateway()
export class MainGateway {
  users: Map<string, WebSocket> = new Map();
  usersInRoom = new Map<string, Map<string, WebSocket>>();

  constructor(
    private userRepository: UserRepository,
    private roomService: RoomService
  ) {}

  @SubscribeMessage('connect')
  async handleConnectUser(
    client: WebSocket,
    payload: { userId: string }
  ): Promise<void> {
    this.users.set(payload.userId, client);
    const user = await this.userRepository.findByIdOrFail(
      Uuid.fromString(payload.userId)
    );
    const { type, source } = user.currentMusicResource;
    this.sendUserAudioSource(user.getId(), type, source);
  }

  @SubscribeMessage('leave')
  async leave(
    client: WebSocket,
    payload: { userId: string; roomId: string }
  ): Promise<void> {
    await this.roomService.leave(
      new LeaveCommand(
        Uuid.fromString(payload.roomId),
        Uuid.fromString(payload.userId)
      )
    );
  }

  sendUserAudioSource(
    userId: Uuid,
    sourceType: AudioSourceType,
    source?: URL
  ): void {
    if (!this.users.has(userId.toString())) {
      return;
    }
    const userSocket: WebSocket = this.users.get(
      userId.toString()
    ) as WebSocket;
    userSocket.send(
      JSON.stringify({
        event: 'source',
        type: sourceType,
        source: source?.toString(),
      })
    );
  }

  sendToUsersInRoom(roomId: Uuid, event: string, message: any): void {
    if (!this.usersInRoom.get(roomId.toString())) {
      return;
    }
    this.usersInRoom
      .get(roomId.toString())
      .forEach((user) => user.send(JSON.stringify({ event, ...message })));
  }

  addUserToRoom(userId: Uuid, roomId: Uuid): void {
    if (!this.usersInRoom.get(roomId.toString())) {
      this.usersInRoom.set(roomId.toString(), new Map());
    }
    this.usersInRoom
      .get(roomId.toString())
      .set(userId.toString(), this.users.get(userId.toString()));
  }

  removeUserFromRoom(userId: Uuid, roomId: Uuid): void {
    this.usersInRoom.get(roomId.toString()).delete(userId.toString());
  }
}

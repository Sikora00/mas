import {
  RoomRepository,
  UserRepository,
} from '@mas/server/core/domain-services';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RoomStartsPlayingEvent } from '../../../../core/domain/src/lib/events/room-starts-playing.event';
import { RoomStopsPlayingEvent } from '../../../../core/domain/src/lib/events/room-stops-playing.event';
import { MainGateway } from '../main.gateway';

@EventsHandler(RoomStartsPlayingEvent, RoomStopsPlayingEvent)
export class RoomPlayingEventsHandler
  implements
    IEventHandler<RoomStopsPlayingEvent>,
    IEventHandler<RoomStartsPlayingEvent> {
  constructor(
    private gateway: MainGateway,
    private roomRepository: RoomRepository,
    private userRepository: UserRepository
  ) {}

  async handle(
    event: RoomStopsPlayingEvent | RoomStartsPlayingEvent
  ): Promise<void> {
    const room = await this.roomRepository.findByIdOrFail(event.roomId);
    const usersIds = (await room.getUsersInRoom()).map((user) => user.getId());
    const users = await Promise.all(
      usersIds.map((userId) => this.userRepository.findByIdOrFail(userId))
    );
    users.forEach((user) => {
      // @TODO .filter(user => user.getWantsToListeningMusic())
      const source = user.currentMusicResource;
      this.gateway.sendUserAudioSource(
        user.getId(),
        source.type,
        source.source
      );
    });
  }
}

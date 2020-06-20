import { Room } from '@mas/server/core/domain';
import {
  RegisteredUserRepository,
  RoomRepository,
} from '@mas/server/core/domain-services';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserRoomsQuery } from './get-user-rooms.query';
import { GetUserRoomsReadModel } from './get-user-rooms.read-model';

@QueryHandler(GetUserRoomsQuery)
export class GetUserRoomsHandler implements IQueryHandler<GetUserRoomsQuery> {
  constructor(
    private registeredUserRepository: RegisteredUserRepository,
    private roomRepository: RoomRepository
  ) {}

  async execute(query: GetUserRoomsQuery): Promise<GetUserRoomsReadModel[]> {
    let rooms: Room[] = [];
    if (query.roomId) {
      rooms.push(await this.roomRepository.findByIdOrFail(query.roomId));
    }
    try {
      const savedRooms = await (
        await this.registeredUserRepository.findByIdOrFail(query.userId)
      ).getSavedRooms();
      rooms = rooms.concat(
        savedRooms.filter((room) =>
          query.roomId ? !room.getId().equals(rooms[0].getId()) : true
        )
      );
    } catch (e) {
      console.error(e);
    }

    return rooms.map(
      (room) =>
        new GetUserRoomsReadModel(room.getId().toString(), room.getName())
    );
  }
}

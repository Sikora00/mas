import { Room, Uuid } from '@mas/server/core/domain';

export abstract class RoomRepository {
  abstract findByIdOrFail(id: Uuid): Promise<Room>;

  abstract save(room: Room): Promise<Room>;
}

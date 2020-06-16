import { Identifiable } from '../interfaces/identifiable';
import { Uuid } from '../value-objects/uuid';
import { VoteValue } from '../value-objects/vote-value';
import { QueuedSong } from './queued-song';
import { RegisteredUser } from './registered-user';

export class Vote implements Identifiable<Vote> {
  private id: string;
  private by: RegisteredUser;
  private song: QueuedSong;
  private value: VoteValue;

  private constructor() {}

  static create(value: VoteValue, song: QueuedSong, by: RegisteredUser): Vote {
    const instance = new Vote();
    instance.id = Uuid.random().toString();
    instance.by = by;
    instance.song = song;
    instance.value = value;

    return instance;
  }

  equals(instance: Vote): boolean {
    return this.getId().equals(instance.getId());
  }

  getId(): Uuid {
    return Uuid.fromString(this.id);
  }
}

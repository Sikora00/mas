import { Identifiable } from '../interfaces/identifiable';
import { Uuid } from '../value-objects/uuid';
import { VoteValue } from '../value-objects/vote-value';
import { RegisteredUser } from './registered-user';
import { Room } from './room';
import { Song } from './song';
import { User } from './user';
import { Vote } from './vote';

export class QueuedSong implements Identifiable<QueuedSong> {
  private addedBy: Promise<User>;
  private id: string;
  private playedAt: Date;
  private room: Promise<Room>;
  private song: Song;
  private votes: Map<string, Vote>;
  private constructor() {}

  static async create(
    song: Song,
    room: Room,
    addedBy?: User
  ): Promise<QueuedSong> {
    const instance = new QueuedSong();
    instance.id = Uuid.random().toString();
    instance.song = song;
    instance.room = Promise.resolve(room);
    instance.addedBy = Promise.resolve(addedBy);

    await room.assignQueueItem(instance);
    await song.addedToQueue(instance);
    await addedBy.addedToQueue(instance);
    return instance;
  }

  equals(instance: QueuedSong): boolean {
    return this.getId().equals(instance.getId());
  }

  getId(): Uuid {
    return Uuid.fromString(this.id);
  }

  getPlayedAt(): Date {
    return this.playedAt;
  }

  getSong(): Song {
    return this.song;
  }

  vote(value: VoteValue, by: RegisteredUser): Vote {
    const userId = by.getId().toString();
    if (!this.votes.has(userId)) {
      const vote = Vote.create(value, this, by);
      this.votes.set(userId, vote);
      return vote;
    } else {
      throw new Error('User already voted for this song');
    }
  }

  play(): void {
    this.playedAt = new Date();
  }
}

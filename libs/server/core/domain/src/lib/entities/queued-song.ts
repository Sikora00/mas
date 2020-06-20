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
  private votes: Promise<Vote[]>;
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
    instance.votes = Promise.resolve([]);

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

  async vote(value: VoteValue, by: RegisteredUser): Promise<Vote> {
    const votes = await this.votes;
    if (!votes.find((vote) => vote.getAddedBy().equals(by))) {
      const vote = Vote.create(value, this, by);
      votes.push(vote);
      return vote;
    } else {
      throw new Error('User already voted for this song');
    }
  }

  play(): void {
    this.playedAt = new Date();
  }
}

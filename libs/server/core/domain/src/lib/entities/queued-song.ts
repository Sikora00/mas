import { Song } from "./song";
import { Room } from "./room";
import { User } from "./user";
import { Identifiable } from "../interfaces/identifiable";
import { Uuid } from "../value-objects/uuid";
import { Vote } from "./vote";
import { VoteValue } from "../value-objects/vote-value";
import { RegisteredUser } from "./registered-user";

export class QueuedSong implements Identifiable<QueuedSong> {
  private addedBy: User
  private id: string;
  private playedAt: Date;
  private room: Room;
  private song: Song;
  private votes: Map<string, Vote>;

  private constructor() {
  }

  static create(song: Song, room: Room, addedBy: User): QueuedSong {
    const instance = new QueuedSong();
    instance.id = Uuid.random().toString();
    instance.song = song;
    instance.room = room;
    instance.addedBy = addedBy;

    room.assignQueueItem(instance);
    song.addedToQueue(instance);
    addedBy.addedToQueue(instance);
    return instance;
  }

  equals(instance: QueuedSong): boolean {
    return this.getId().equals(instance.getId())
  }

  getId(): Uuid {
    return Uuid.fromString(this.id);
  }

  vote(value: VoteValue, by: RegisteredUser): Vote {
    const userId = by.getId().toString();
    if (!this.votes.has(userId)) {
      const vote = Vote.create(value, this, by);
      this.votes.set(userId, vote);
      return vote;
    } else {
      throw new Error("User already voted for this song")
    }
  }
}

import { AggregateRoot } from '@nestjs/cqrs';
import { CurrentSongChangedEvent } from '../events/current-song-changed.event';
import { QueueChangedEvent } from '../events/queue-changed.event';
import { RoomStartsPlayingEvent } from '../events/room-starts-playing.event';
import { RoomStopsPlayingEvent } from '../events/room-stops-playing.event';
import { UserJoinedRoomEvent } from '../events/user-joined-room.event';
import { UserLeavedRoomEvent } from '../events/user-leaved-room.event';
import { Identifiable } from '../interfaces/identifiable';
import { Uuid } from '../value-objects/uuid';
import { VoteValue } from '../value-objects/vote-value';
import { Moderator } from './moderator';
import { Playlist } from './playlist';
import { QueuedSong } from './queued-song';
import { RegisteredUser } from './registered-user';
import { Song } from './song';
import { User } from './user';

export class Room extends AggregateRoot implements Identifiable<Room> {
  private static readonly startQueueOwnSongs = 50;

  private address: string;
  private currentSong?: QueuedSong;
  private id: string;
  private moderators: Promise<Moderator[]>;
  private name: string;
  private queue: Promise<QueuedSong[]>;
  private savedFor: Promise<RegisteredUser[]>;
  private usersInRoom: Promise<User[]>;

  private constructor() {
    super();
  }

  static create(id: Uuid, name: string, createdBy: RegisteredUser): Room {
    const instance = new Room();
    instance.id = id.toString();
    instance.name = name;
    instance.address = 'http://localhost:3333/stream/' + instance.id;
    instance.moderators = Promise.resolve([createdBy.appointModerator()]);
    instance.queue = Promise.resolve([]);
    instance.savedFor = Promise.resolve([]);
    instance.usersInRoom = Promise.resolve([]);
    return instance;
  }

  async addModerator(moderator: Moderator): Promise<void> {
    const moderators = await this.moderators;
    if (!moderators.find((m) => m.equals(moderator))) {
      moderators.push(moderator);
      await moderator.moderate(this);
    }
  }

  async addToQueue(song: Song, addedBy?: User): Promise<void> {
    const queuedSong = await QueuedSong.create(song, this, addedBy);
    await this.assignQueueItem(queuedSong);
    this.apply(new QueueChangedEvent(this.getId()));
  }

  async assignQueueItem(queuedSong: QueuedSong): Promise<void> {
    const queue = await this.queue;
    if (!queue.find((queueItem) => queueItem.equals(queuedSong))) {
      queue.push(queuedSong);
    }
  }

  equals(user: Room): boolean {
    return user.getId().equals(this.getId());
  }

  getId(): Uuid {
    return Uuid.fromString(this.id);
  }

  getMusicResource(): URL {
    return new URL(`http://localhost:3333/api/room/${this.id}/stream`);
  }

  getName(): string {
    return this.name;
  }

  async getQueue(): Promise<QueuedSong[]> {
    return (await this.queue).filter((queuedSong) => !queuedSong.getPlayedAt());
  }

  getUsersInRoom(): Promise<User[]> {
    return this.usersInRoom;
  }

  async goToTheNextSong(): Promise<void> {
    const queue = await this.queue;
    this.currentSong = queue.shift();
  }

  isMusicPlaying(): boolean {
    return !!this.currentSong;
  }

  async join(user: User): Promise<void> {
    const usersInRoom = await this.usersInRoom;
    if (!usersInRoom.find((u) => u.equals(user))) {
      usersInRoom.push(user);
      await user.join(this);
      this.apply(new UserJoinedRoomEvent(user.getId(), this.getId()));
    }
  }

  async kickUser(user: User): Promise<void> {
    const usersInRoom = await this.usersInRoom;
    if (usersInRoom.find((u) => u.equals(user))) {
      usersInRoom.filter((u) => !u.equals(user));
      await user.kickFromRoom();
    }
  }

  async leave(user: User): Promise<void> {
    const usersInRoom = await this.usersInRoom;
    if (usersInRoom.find((u) => u.equals(user))) {
      this.usersInRoom = Promise.resolve(
        usersInRoom.filter((u) => !u.equals(user))
      );
      await user.leave(this);
      this.apply(new UserLeavedRoomEvent(user.getId(), this.getId()));
    }
  }

  async queuePlaylist(playlist: Playlist, by: RegisteredUser): Promise<void> {
    for (const song of await playlist.getAllSongs()) {
      await this.addToQueue(song, by);
    }
  }

  async saveByUser(user: RegisteredUser): Promise<void> {
    const savedFor = await this.savedFor;
    if (!savedFor.find((u) => u.equals(user))) {
      savedFor.push(user);
      await user.save(this);
    }
  }

  getCurrentSong(): QueuedSong | undefined {
    return this.currentSong;
  }

  async playNextSong(): Promise<void> {
    const queue = (await this.queue).filter((song) => !song.getPlayedAt());
    const nextSong = queue.shift() || null;
    if (!nextSong) {
      const uniqueSongsIds = [
        ...new Set(queue.map((item) => item.getSong().getId().toString())),
      ];
      if (uniqueSongsIds.length > Room.startQueueOwnSongs) {
        await this.addToQueue(
          queue[Math.floor(Math.random() * queue.length)].getSong(),
          null
        );
        await this.playNextSong();
      } else if (this.isMusicPlaying()) {
        this.apply(new RoomStopsPlayingEvent(this.getId()));
        this.apply(new CurrentSongChangedEvent(this.getId()));
      }
    } else {
      if (!this.isMusicPlaying()) {
        this.apply(new RoomStartsPlayingEvent(this.getId()));
      }
      this.apply(new CurrentSongChangedEvent(this.getId()));
      this.apply(new QueueChangedEvent(this.getId()));
    }
    this.currentSong = nextSong;
    this.currentSong?.play();
  }

  async vote(value: VoteValue, by: RegisteredUser): Promise<void> {
    await this.currentSong?.vote(value, by);
  }
}

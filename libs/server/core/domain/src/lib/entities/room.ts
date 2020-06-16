import { Identifiable } from '../interfaces/identifiable';
import { Uuid } from '../value-objects/uuid';
import { Moderator } from './moderator';
import { Playlist } from './playlist';
import { QueuedSong } from './queued-song';
import { RegisteredUser } from './registered-user';
import { Song } from './song';
import { User } from './user';

export class Room implements Identifiable<Room> {
  private static readonly startQueueOwnSongs = 50;

  private address: string;
  private currentSong?: QueuedSong;
  private id: string;
  private moderators: Moderator[];
  private name: string;
  private queue: Promise<QueuedSong[]>;
  private savedFor: RegisteredUser[];
  private usersInRoom: User[];

  private constructor() {}

  static create(id: Uuid, name: string, createdBy: RegisteredUser): Room {
    const instance = new Room();
    instance.id = id.toString();
    instance.name = name;
    instance.address = 'http://localhost:3333/stream/' + instance.id;
    instance.moderators = [createdBy.appointModerator()];
    instance.queue = Promise.resolve([]);
    instance.savedFor = [];
    instance.usersInRoom = [];
    return instance;
  }

  addModerator(moderator: Moderator): void {
    if (!this.moderators.find((m) => m.equals(moderator))) {
      this.moderators.push(moderator);
      moderator.moderate(this);
    }
  }

  async addToQueue(song: Song, addedBy: User): Promise<void> {
    const queuedSong = await QueuedSong.create(song, this, addedBy);
    await this.assignQueueItem(queuedSong);
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
    return new URL(`localhost:3333/stream/channel/${this.id}`);
  }

  getName(): string {
    return this.name;
  }

  async goToTheNextSong(): Promise<void> {
    const queue = await this.queue;
    this.currentSong = queue.shift();
  }

  isMusicPlaying(): boolean {
    return !!this.currentSong;
  }

  join(user: User): void {
    if (!this.usersInRoom.find((u) => u.equals(user))) {
      this.usersInRoom.push(user);
      user.join(this);
    }
  }

  kickUser(user: User): void {
    if (this.usersInRoom.find((u) => u.equals(user))) {
      this.usersInRoom.filter((u) => !u.equals(user));
      user.kickFromRoom();
    }
  }

  async queuePlaylist(playlist: Playlist, by: RegisteredUser): Promise<void> {
    for (const song of playlist.getAllSongs()) {
      await this.addToQueue(song, by);
    }
  }

  saveByUser(user: RegisteredUser): void {
    if (!this.savedFor.find((u) => u.equals(user))) {
      this.savedFor.push(user);
      user.save(this);
    }
  }

  getCurrentSong(): QueuedSong | null {
    return this.currentSong;
  }

  async playNextSong(): Promise<void> {
    const queue = (await this.queue).filter((song) => !song.getPlayedAt());
    this.currentSong = queue.shift();
    this.currentSong?.play();
  }
}

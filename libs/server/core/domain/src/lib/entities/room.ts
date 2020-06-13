import { Identifiable } from "../interfaces/identifiable";
import { Uuid } from "../value-objects/uuid";
import { User } from "./user";
import { RegisteredUser } from "./registered-user";
import { Moderator } from "./moderator";
import { QueuedSong } from "./queued-song";
import { Song } from "./song";
import { Playlist } from "./playlist";

export class Room implements Identifiable<Room> {
  private static readonly startQueueOwnSongs = 50;

  private address: URL;
  private currentSong?: QueuedSong;
  private id: string;
  private moderators: Moderator[];
  private name: string;
  private queue: QueuedSong[];
  private savedFor: RegisteredUser[];
  private usersInRoom: User[];

  addModerator(moderator: Moderator): void {
    if (!this.moderators.find(m => m.equals(moderator))) {
      this.moderators.push(moderator);
      moderator.moderate(this);
    }
  }

  addToQueue(song: Song, addedBy: User): void {
    const queuedSong = QueuedSong.create(song, this, addedBy);
    this.assignQueueItem(queuedSong);
  }

  assignQueueItem(queuedSong: QueuedSong): void {
    if (!this.queue.find(queueItem => queueItem.equals(queuedSong))) {
      this.queue.push(queuedSong);
    }
  }

  equals(user: Room): boolean {
    return user.getId().equals(this.getId());
  }

  getId(): Uuid {
    return Uuid.fromString(this.id);
  }

  getMusicResource(): URL {
    return new URL(`localhost:3333/stream/channel/${this.id}`)
  }

  goToTheNextSong(): void {
    this.currentSong = this.queue.shift();
  }

  isMusicPlaying(): boolean {
    return !!this.currentSong;
  }

  join(user: User): void {
    if (!this.usersInRoom.find(u => u.equals(user))) {
      this.usersInRoom.push(user);
      user.join(this);
    }
  }

  kickUser(user: User): void {
    if (this.usersInRoom.find(u => u.equals(user))) {
      this.usersInRoom.filter(u => !u.equals(user));
      user.kickFromRoom();
    }
  }

  queuePlaylist(playlist: Playlist, by: RegisteredUser): void {
    playlist.getAllSongs().forEach(song => {
      this.addToQueue(song, by);
    })
  }

  saveByUser(user: RegisteredUser): void {
    if (!this.savedFor.find(u => u.equals(user))) {
      this.savedFor.push(user);
      user.save(this);
    }
  }
}

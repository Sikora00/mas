import { AggregateRoot } from '@nestjs/cqrs';
import { AudioSourceType } from '../..';
import { UserChangedPotentialMusicSourceEvent } from '../events/user-changed-potentional-music-source.event';
import { Identifiable } from '../interfaces/identifiable';
import { UserMusicResource } from '../value-objects/user-music-resource';
import { Uuid } from '../value-objects/uuid';
import { ExternalRadio } from './external-radio';
import { QueuedSong } from './queued-song';
import { Room } from './room';
import { Vote } from './vote';

export abstract class User extends AggregateRoot implements Identifiable<User> {
  protected id: string;
  protected isActive: boolean;
  protected name: string;
  protected queued: Promise<QueuedSong[]>;
  protected selectedExternalRadio?: ExternalRadio;
  protected selectedRoom?: Room;
  protected votes: Promise<Vote[]>;
  protected wantsToListenMusic: boolean;

  get currentMusicResource(): UserMusicResource {
    if (this.selectedRoom?.isMusicPlaying()) {
      return {
        type: AudioSourceType.Room,
        source: this.selectedRoom.getMusicResource(),
      };
    } else if (this.selectedExternalRadio) {
      return {
        type: AudioSourceType.Radio,
        source: this.selectedExternalRadio.getMusicResource(),
      };
    }
    return { type: AudioSourceType.None };
  }

  async addedToQueue(queuedSong: QueuedSong): Promise<void> {
    const queued = await this.queued;
    if (!queued.find((queuedItem) => queuedItem.equals(queuedSong))) {
      queued.push(queuedSong);
    }
  }

  equals(user: User): boolean {
    return user.getId().equals(this.getId());
  }

  getId(): Uuid {
    return Uuid.fromString(this.id);
  }

  getWantsToListeningMusic(): boolean {
    return this.wantsToListenMusic;
  }

  getSelectedExternalRadio(): ExternalRadio | undefined {
    return this.selectedExternalRadio;
  }

  hasSelectExternalRadio(): boolean {
    return !!this.selectedExternalRadio;
  }

  async join(room: Room): Promise<void> {
    if (!this.selectedRoom?.equals(room)) {
      if (this.selectedRoom) {
        await this.leave(this.selectedRoom);
      }
      this.selectedRoom = room;
      this.apply(new UserChangedPotentialMusicSourceEvent(this.getId()));
      await room.join(this);
    }
  }

  async leave(room: Room): Promise<void> {
    if (this.selectedRoom?.equals(room)) {
      this.selectedRoom = null;
      await room.leave(this);
    }
  }

  listenMusic(): void {
    this.wantsToListenMusic = true;
  }

  async selectExternalRadio(externalRadio: ExternalRadio): Promise<void> {
    if (!this.selectedExternalRadio?.equals(externalRadio)) {
      this.selectedExternalRadio = externalRadio;
      await this.selectedExternalRadio.select(this);
      this.apply(new UserChangedPotentialMusicSourceEvent(this.getId()));
    }
  }

  stopListening(): void {
    this.wantsToListenMusic = false;
  }

  async kickFromRoom(): Promise<void> {
    const room = this.selectedRoom;
    this.selectedRoom = null;
    await room.kickUser(this);
  }
}

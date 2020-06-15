import { Identifiable } from '../interfaces/identifiable';
import { Uuid } from '../value-objects/uuid';
import { ExternalRadio } from './external-radio';
import { Room } from './room';
import { QueuedSong } from './queued-song';

export abstract class User implements Identifiable<User> {
  protected id: string;
  protected isActive: boolean;
  protected name: string;
  protected queued: QueuedSong[];
  protected selectedExternalRadio?: ExternalRadio;
  protected selectedRoom?: Room;
  protected wantsToListenMusic: boolean;

  // @ts-ignore
  get currentMusicResource(): URL {}

  addedToQueue(queuedSong: QueuedSong): void {
    if (!this.queued.find((queuedItem) => queuedItem.equals(queuedSong))) {
      this.queued.push(queuedSong);
    }
  }

  equals(user: User): boolean {
    return user.getId().equals(this.getId());
  }

  getId(): Uuid {
    return Uuid.fromString(this.id);
  }

  hasSelectExternalRadio(): boolean {
    return !!this.selectedExternalRadio;
  }

  join(room: Room): void {
    if (!this.selectedRoom?.equals(room)) {
      this.selectedRoom = room;
      room.join(this);
    }
  }

  listenMusic(): void {
    this.wantsToListenMusic = true;
  }

  selectExternalRadio(externalRadio: ExternalRadio): void {
    if (!this.selectedExternalRadio?.equals(externalRadio)) {
      this.selectedExternalRadio = externalRadio;
      this.selectedExternalRadio.select(this);
    }
  }

  stopListening(): void {
    this.wantsToListenMusic = false;
  }

  kickFromRoom(): void {
    const room = this.selectedRoom;
    this.selectedRoom = null;
    room.kickUser(this);
  }
}

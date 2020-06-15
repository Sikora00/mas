import { User } from './user';
import { Room } from './room';
import { Uuid } from '../..';

export class RegisteredUser extends User {
  private login: string;
  private password: string;
  private previousPasswords: string[];
  private savedRooms: Promise<Room[]>;

  static register(
    id: Uuid,
    name: string,
    login: string,
    password: string
  ): RegisteredUser {
    const instance = new RegisteredUser();
    instance.id = id.toString();
    instance.name = name;
    instance.isActive = true;
    instance.queued = [];
    instance.wantsToListenMusic = false;
    instance.login = login;
    instance.password = password;
    instance.previousPasswords = [password];
    return instance;
  }

  getSavedRooms(): Promise<Room[]> {
    return this.savedRooms;
  }

  appointModerator() {
    const Moderator = require('./moderator').Moderator;
    return Moderator.createFromRegisteredUser(this);
  }

  changePassword(newPassword: string): void {
    if (this.previousPasswords.includes(newPassword)) {
      const oldPassword = this.password;
      this.password = newPassword;
      if (this.previousPasswords.length === 3) {
        this.previousPasswords.shift();
      }
      this.previousPasswords.push(oldPassword);
    }
  }

  async save(room: Room): Promise<void> {
    const savedRooms = await this.savedRooms;
    if (!savedRooms.find((r) => r.equals(room))) {
      savedRooms.push(room);
      room.saveByUser(this);
    }
  }
}

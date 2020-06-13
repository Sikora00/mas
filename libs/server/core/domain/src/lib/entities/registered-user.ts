import { User } from "./user";
import { Moderator } from "./moderator";
import { Room } from "./room";

export class RegisteredUser extends User {
  private login: string;
  private password: string;
  private previousPasswords: string[];
  private savedRooms: Room[]

  static register(login: string, password: string): RegisteredUser {
    const instance = new RegisteredUser();
    instance.login = login;
    instance.password = password;
    instance.previousPasswords = [password];
    return instance;
  }

  appointModerator(): Moderator {
    return Moderator.createFromRegisteredUser(this);
  }

  changePassword(newPassword: string): void {
    if(this.previousPasswords.includes(newPassword)) {
      const oldPassword = this.password;
      this.password = newPassword;
      if(this.previousPasswords.length === 3) {
        this.previousPasswords.shift();
      }
      this.previousPasswords.push(oldPassword);
    }
  }

  save(room: Room): void {
    if(!this.savedRooms.find(r => r.equals(room))) {
      this.savedRooms.push(room);
      room.saveByUser(this)
    }
  }
}


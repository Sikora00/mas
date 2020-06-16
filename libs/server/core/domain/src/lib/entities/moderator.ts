import { RegisteredUser } from './registered-user';
import { Room } from './room';

export class Moderator extends RegisteredUser {
  moderates: Room[];

  static createFromRegisteredUser(user: RegisteredUser): Moderator {
    return Object.assign(new Moderator(), user);
  }

  moderate(room: Room): void {
    if (!this.moderates.find((r) => r.equals(room))) {
      this.moderates.push(room);
      room.addModerator(this);
    }
  }
}

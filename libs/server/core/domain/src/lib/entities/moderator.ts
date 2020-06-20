import { RegisteredUser } from './registered-user';
import { Room } from './room';

export class Moderator extends RegisteredUser {
  moderates: Promise<Room[]>;

  static createFromRegisteredUser(user: RegisteredUser): Moderator {
    return Object.assign(new Moderator(), user);
  }

  async moderate(room: Room): Promise<void> {
    const moderates = await this.moderates;
    if (!moderates.find((r) => r.equals(room))) {
      moderates.push(room);
      await room.addModerator(this);
    }
  }
}

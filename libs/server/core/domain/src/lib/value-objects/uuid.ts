import { v4 as uuidGen } from 'uuid';
import { InvalidArgumentException } from '../errors/invalid-argument.exception';

export class Uuid {
  private uuid!: string;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static forceMap(uuid: string): Uuid {
    const self = new Uuid();
    self.uuid = uuid.toUpperCase();
    return self;
  }

  public static fromString(uuid: string): Uuid {
    const self = new Uuid();
    self.uuid = uuid.toUpperCase();
    Uuid.validate(self.uuid);

    return self;
  }

  public static random(): Uuid {
    const self = new Uuid();
    self.uuid = uuidGen().toUpperCase();
    return self;
  }

  public static validate(uuid: string): void {
    uuid = uuid.toUpperCase();

    if (
      !uuid ||
      uuid.length !== 36 ||
      !uuid.match(
        '^{?[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}}?$'
      )
    ) {
      throw new InvalidArgumentException(`Uuid ${uuid} is invalid`);
    }
  }

  public equals(uuid: Uuid): boolean {
    return this.uuid === uuid.uuid;
  }

  public toString(): string {
    return this.uuid;
  }
}

import { Identifiable } from '../interfaces/identifiable';
import { Uuid } from '../value-objects/uuid';
import { User } from './user';

export class ExternalRadio implements Identifiable<ExternalRadio> {
  private id: string;
  private name: string;
  private logo: string;
  private address: string;
  private selectedBy: Promise<User[]>;

  private constructor() {}

  static create(name: string, logo: URL, address: URL): ExternalRadio {
    const instance = new ExternalRadio();
    instance.id = Uuid.random().toString();
    instance.name = name;
    instance.logo = logo.toString();
    instance.address = address.toString();
    instance.selectedBy = Promise.resolve([]);
    return instance;
  }

  equals(externalRadio: ExternalRadio): boolean {
    return externalRadio.getId().equals(this.getId());
  }

  getId(): Uuid {
    return Uuid.fromString(this.id);
  }

  getLogoUrl(): URL {
    return new URL(this.logo);
  }

  getMusicResource(): URL {
    return new URL(this.address);
  }

  getName(): string {
    return this.name;
  }

  async select(user: User): Promise<void> {
    const selectedBy = await this.selectedBy;
    if (!!selectedBy.find((u) => u.equals(user))) {
      selectedBy.push(user);
      user.selectExternalRadio(this);
    }
  }
}

import { User } from "./user";
import { Identifiable } from "../interfaces/identifiable";
import { Uuid } from "../value-objects/uuid";

export class ExternalRadio implements Identifiable<ExternalRadio> {
  private id: string;
  private name: string;
  private logo: URL;
  private address: URL;
  private selectedBy: User[]

  equals(externalRadio: ExternalRadio): boolean {
    return externalRadio.getId().equals(this.getId());
  }

  getId(): Uuid {
    return Uuid.fromString(this.id);
  }

  getMusicResource(): URL {
    return this.address;
  }

  select(user: User): void {
    if (!!this.selectedBy.find(u => u.equals(user))) {
      this.selectedBy.push(user);
      user.selectExternalRadio(this);
    }
  }
}

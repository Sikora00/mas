import { Uuid } from '../value-objects/uuid';

export interface Identifiable<T extends Identifiable<any>> {
  equals(instance: T): boolean;
  getId(): Uuid;
}

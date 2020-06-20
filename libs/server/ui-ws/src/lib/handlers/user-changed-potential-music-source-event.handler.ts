import { UserRepository } from '@mas/server/core/domain-services';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserChangedPotentialMusicSourceEvent } from '../../../../core/domain/src/lib/events/user-changed-potentional-music-source.event';
import { MainGateway } from '../main.gateway';

@EventsHandler(UserChangedPotentialMusicSourceEvent)
export class UserChangedPotentialMusicSourceEventHandler
  implements IEventHandler<UserChangedPotentialMusicSourceEvent> {
  constructor(
    private gateway: MainGateway,
    private userRepository: UserRepository
  ) {}

  async handle(event: UserChangedPotentialMusicSourceEvent): Promise<void> {
    const user = await this.userRepository.findByIdOrFail(event.userId);
    const { type, source } = user.currentMusicResource;
    this.gateway.sendUserAudioSource(user.getId(), type, source);
  }
}

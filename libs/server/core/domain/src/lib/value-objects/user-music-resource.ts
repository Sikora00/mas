import { AudioSourceType } from '@mas/server/core/domain';

export interface UserMusicResource {
  type: AudioSourceType;
  source?: URL;
}

import { AudioSource } from '../models/audio-source';

export interface AudioSourceReceivedAction {
  type: AudioSource;
  source: string;
}

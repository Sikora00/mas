import { Response } from 'express';

export class ResponseStreamerService {
  constructor(protected res: Response) {}

  /**
   * Sets required headers for audio streaming
   * and pass audio stream as a response content
   * @param stream
   */
  stream(stream: NodeJS.ReadableStream): void {
    this.res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
    });
    stream.pipe(this.res);
  }
}

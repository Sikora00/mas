import { Response } from 'express';

export class ResponseStreamerService {
  constructor(protected res: Response) {}

  stream(stream: NodeJS.ReadableStream): void {
    this.res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
    });
    stream.pipe(this.res);
  }
}

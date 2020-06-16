import { GetRoomStreamReadModel } from '@mas/server/core/application-services';
import { QueuedSong, Room, Uuid } from '@mas/server/core/domain';
import { RoomRepository } from '@mas/server/core/domain-services';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as mp3Duration from 'mp3-duration';
import { PassThrough, Writable } from 'stream';
import { Repository } from 'typeorm';
import { QueuedSongSchema } from '../../../../../../../infrastructure/src/lib/typeorm/schemas/queued-song.schema';
import { GetRoomStreamQuery } from './get-room-stream.query';

@QueryHandler(GetRoomStreamQuery)
export class GetRoomStreamHandler implements IQueryHandler<GetRoomStreamQuery> {
  private readonly roomsStreams: Map<string, NodeJS.ReadableStream> = new Map();

  constructor(
    private roomRepository: RoomRepository,
    @InjectRepository(QueuedSongSchema)
    private queuedSongRepository: Repository<QueuedSong>
  ) {}

  async execute(query: GetRoomStreamQuery): Promise<GetRoomStreamReadModel> {
    if (!this.roomsStreams.get(query.id.toString())) {
      const room = await this.roomRepository.findByIdOrFail(query.id);
      this.roomsStreams.set(query.id.toString(), await this.createStream(room));
    }
    return new GetRoomStreamReadModel(
      this.roomsStreams.get(query.id.toString())
    );
  }

  private async createStream(room: Room): Promise<NodeJS.ReadableStream> {
    const roomStream = new PassThrough();
    this.handleNextSongs(room.getId(), roomStream);
    return roomStream;
  }

  private async handleNextSongs(
    roomId: Uuid,
    roomStream: Writable
  ): Promise<void> {
    const room = await this.roomRepository.findByIdOrFail(roomId);
    await room.playNextSong();
    const currentSongId = room.getCurrentSong()?.getId().toString();
    let streamPromise;
    if (currentSongId) {
      const currentSong = await this.queuedSongRepository.findOneOrFail(
        currentSongId
      );
      streamPromise = this.streamFile(
        currentSong.getSong().getAudioFilePath(),
        roomStream
      );
    } else {
      streamPromise = this.streamFile(
        'assets/songs/10-sec-of-silence.mp3',
        roomStream
      );
    }
    await this.roomRepository.save(room);
    await streamPromise;
    this.handleNextSongs(room.getId(), roomStream);
  }

  private streamFile(filePath: string, dest: Writable): Promise<void> {
    return new Promise((resolve) =>
      fs.stat(filePath, async (err, stats) => {
        const duration = (await mp3Duration(filePath)) * 1000;
        const blockSize = stats.blksize;
        let start = 0;
        let end = 0;
        const delay = duration * (blockSize / stats.size);
        while (end < stats.size) {
          end = start + blockSize;
          if (end > stats.size) {
            end = stats.size;
          }
          await this.streamFilePart(filePath, start, end, dest, delay);
          if (end === stats.size) {
            resolve();
          }
          start = end + 1;
        }
      })
    );
  }

  private async streamFilePart(
    filePath: string,
    start: number,
    end: number,
    dest: Writable,
    delay: number
  ): Promise<void> {
    return new Promise((resolve) => {
      const stream = fs.createReadStream(filePath, { start, end });
      stream.pipe(dest, { end: false });
      stream.on('close', () => {
        stream.unpipe(dest);
        setTimeout(resolve, delay);
      });
    });
  }
}

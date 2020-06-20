export class GetRoomReadModel {
  constructor(
    public id: string,
    public name: string,
    public currentSong: { title: string },
    public queue: { title: string; image: string }[]
  ) {}
}

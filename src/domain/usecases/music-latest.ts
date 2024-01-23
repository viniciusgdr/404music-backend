import { type Music } from '../models/music'

export interface MusicLatest {
  load: () => Promise<MusicLatest.Result>
}

export namespace MusicLatest {
  export type Result = Array<Omit<Music, 'partnerId'>>
}

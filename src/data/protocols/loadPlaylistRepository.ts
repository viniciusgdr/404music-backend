import { type Playlist } from '@prisma/client'

export interface LoadPlaylistRepository {
  load: (playlistId: string) => Promise<LoadPlaylistRepository.Result>
}

export namespace LoadPlaylistRepository {
  export type Result = Playlist
}

export type PlaylistType = 'PUBLIC' | 'PRIVATE'
export interface Playlist {
  id: string
  title: string
  description: string
  thumbnail: string
  userId: string
  type: PlaylistType
  createdAt: Date
  updatedAt: Date
}

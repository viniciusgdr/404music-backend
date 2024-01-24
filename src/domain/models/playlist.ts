export type PlaylistType = 'PUBLIC' | 'PRIVATE'
export interface Playlist {
  id: string
  title: string
  description: string
  thumbnail: string
  userId: string
  type: PlaylistType
  fixed: boolean
  createdAt: Date
  updatedAt: Date
}

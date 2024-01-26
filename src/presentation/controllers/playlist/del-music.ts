import { type DelMusicPlaylist } from '../../../domain/usecases/del-music-playlist'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { type HttpRequest, type Controller, type HttpResponse } from '../../protocols'

export class DelMusicPlaylistController implements Controller {
  constructor (
    private readonly delMusicPlaylist: DelMusicPlaylist
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { playlistId, musicId, userId } = request.body
      const requiredFields = ['playlistId', 'musicId', 'userId']
      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const music = await this.delMusicPlaylist.delMusic({
        playlistId,
        musicId,
        userId
      })
      return ok({
        music
      })
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}

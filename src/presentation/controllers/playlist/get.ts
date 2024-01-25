import { type GetPlaylist } from '@/domain/usecases/get-playlist'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers/http-helper'
import { type HttpRequest, type Controller, type HttpResponse } from '@/presentation/protocols'

export class GetPlaylistController implements Controller {
  constructor (
    private readonly getPlaylist: GetPlaylist
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { playlistId } = request.body
      const requiredFields = ['playlistId']
      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const playlist = await this.getPlaylist.getPlaylist({
        playlistId
      })
      return ok(playlist)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

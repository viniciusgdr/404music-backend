import { type PlaylistList } from '../../../domain/usecases/playlist-list'
import { MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http-helper'
import { type HttpRequest, type Controller, type HttpResponse } from '../../protocols'

export class PlaylistListController implements Controller {
  constructor (private readonly playlistList: PlaylistList) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['id']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const musics = await this.playlistList.load({
        id: httpRequest.body.id
      })
      return ok(musics)
    } catch (error: any) {
      return badRequest(error)
    }
  }
}

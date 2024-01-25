import { type CreatePlaylist } from '../../../domain/usecases/create-playlist'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { type HttpRequest, type Controller, type HttpResponse } from '../../protocols'

export class CreatePlaylistController implements Controller {
  constructor (
    private readonly createPlaylist: CreatePlaylist
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.body.userId) {
        return badRequest(new MissingParamError('userId'))
      }
      const playlist = await this.createPlaylist.create({
        userId: request.body.userId,
        title: request.body.title,
        thumbnailUrl: request.body.thumbnailUrl
      })

      return ok(playlist)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

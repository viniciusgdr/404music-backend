import { type DeletePlaylist } from '../../../domain/usecases/delete-playlist'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { type HttpRequest, type Controller, type HttpResponse } from '../../protocols'

export class DeletePlaylistController implements Controller {
  constructor (
    private readonly deletePlaylist: DeletePlaylist
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.body.userId) {
        return badRequest(new MissingParamError('userId'))
      }
      const playlist = await this.deletePlaylist.delete(request.body)

      return ok(playlist)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}

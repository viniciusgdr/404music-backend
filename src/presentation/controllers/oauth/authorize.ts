import { type Authenticate } from '../../../domain/usecases/authenticate'
import { serverError } from '../../helpers/http-helper'
import { type HttpRequest, type HttpResponse, type Controller } from '../../protocols'

export class OAuthAuthorizeController implements Controller {
  constructor (
    private readonly authenticate: Authenticate
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { code } = httpRequest.query
      const result = await this.authenticate.auth({ code })
      httpRequest._extra?.res.redirect(`gdrmusic://oauth-callback?token=${encodeURIComponent(result.jwt)}`)
      return {
        statusCode: 200,
        body: null,
        stream: true
      }
    } catch (error: Error | any) {
      console.log(error)
      return serverError(error)
    }
  }
}

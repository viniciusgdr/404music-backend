import { prismaClient } from '../../../main/server'
import { MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http-helper'
import { type HttpRequest, type Controller, type HttpResponse } from '../../protocols'

export class SessionController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.additionalInfo

    if (!userId) {
      return badRequest(new MissingParamError('userId'))
    }

    const user = await prismaClient.user.findUnique({
      where: {
        id: userId
      },
      select: {
        accountMethod: true,
        email: true,
        id: true,
        imageUrl: true,
        name: true,
        userId: true
      }
    })

    if (!user) {
      return badRequest(new MissingParamError('user'))
    }

    return ok({
      id: user.id,
      userId: user.userId,
      email: user.email,
      name: user.name,
      picture: user.imageUrl,
      accountMethod: user.accountMethod
    })
  }
}

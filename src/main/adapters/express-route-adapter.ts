import { type Request, type Response } from 'express'
import { type Controller } from '../../presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      params: req.params,
      query: req.query,
      body: req.body,
      _extra: {
        res
      }
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.stream) {
      return
    }

    if (typeof httpResponse.body === 'string') {
      res.status(httpResponse.statusCode).send(httpResponse.body)
      return
    }
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

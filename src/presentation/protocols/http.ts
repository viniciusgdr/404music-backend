import { type Response } from 'express'

export interface HttpResponse {
  statusCode: number
  body: any
  stream?: boolean
  headers?: Record<string, string>
}
export interface HttpRequest {
  body?: any
  query?: any
  params?: any
  _extra?: {
    res: Response
  }
}

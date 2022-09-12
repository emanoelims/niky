import HttpRequest from './HttpRequest'
import HttpResponse from './HttpResponse'

export type HttpRequestParams = (request: HttpRequest) => Promise<HttpResponse>

export default interface Http {
  on: (method: string, path: string, callback: HttpRequestParams) => void
  listen: (port: number) => void
}

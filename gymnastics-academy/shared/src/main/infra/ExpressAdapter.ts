import express, { Express, Request, Response } from 'express'

import Http, { HttpRequestParams } from '../domain/http/Http'

class ExpressAdapter implements Http {
  private readonly _app: Express

  constructor() {
    this._app = express()
    this._app.use(express.json())
  }

  listen(port: number): void {
    this._app.listen(port, () => console.log(`server is listening on port ${port}`))
  }

  on(method: string, path: string, callback: HttpRequestParams): void {
    // @ts-expect-error
    this._app[method](path, async (request: Request, response: Response) => {
      // eslint-disable-next-line n/no-callback-literal
      const { statusCode, body } = await callback({
        params: request.params,
        body: request.body,
      })
      response.status(statusCode).json(body)
    })
  }
}

export default ExpressAdapter

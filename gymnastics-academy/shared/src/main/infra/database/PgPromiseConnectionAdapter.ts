// @ts-ignore
import pgp from 'pg-promise'
import Connection from './Connection'

class PgPromiseConnectionAdapter implements Connection {
  private pgp: any

  constructor() {
    this.pgp = pgp()('postgresql://localhost/niky')
  }

  public async query(statement: string, params: any): Promise<any> {
    this.pgp.query(statement, params)
  }
}

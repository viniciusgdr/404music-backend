import { type Authenticate } from '../../../domain/usecases/authenticate'
import { GeneratePayloadSession } from '../../protocols/db/GeneratePayloadSession'
import { SaveSessionRepository } from '../../protocols/db/GenerateSessionRepository'
import { type GetUserInfoRepository } from '../../protocols/db/GetUserInfoRepository'
import { AddAccountRepository } from '../../protocols/db/add-account-repository'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthenticate implements Authenticate {
  constructor (
    private readonly getUserInfoRepository: GetUserInfoRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly generatePayloadSession: GeneratePayloadSession,
    private readonly saveSessionRepository: SaveSessionRepository
  ) { }

  async auth (params: Authenticate.Params): Promise<Authenticate.Result> {
    try {
      const user = await this.getUserInfoRepository.load(params)
      console.log(user)
      if (!user) {
        throw new Error('User not found')
      }
      let account = await this.loadAccountByEmailRepository.loadByEmail(user.email)
      if (!account) {
        account = await this.addAccountRepository.add({
          name: user.name,
          email: user.email,
          password: '',
          accountMethod: 'GOOGLE',
          userId: user.id,
          image: user.picture
        })
      }
      if (!account) {
        throw new Error('User not found')
      }
      const { payload } = await this.generatePayloadSession.generate({
        userId: account.id
      })
      await this.saveSessionRepository.save({ userId: account.id, payload })

      return { jwt: payload }
    } catch (error) {
      console.log(error)
      throw new Error('Failed to authenticate')
    }
  }
}

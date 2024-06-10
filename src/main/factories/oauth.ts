import { DbAuthenticate } from '../../data/usecases/authenticate/db-authenticate'
import { JwtAdapter } from '../../infra/cryptography/jwt-adapter'
import { AccountPrismaRepository } from '../../infra/db/prisma/account-repository/account'
import { PayloadGenerator } from '../../infra/db/prisma/payload-generator'
import { GoogleUserRepository } from '../../infra/oauth/google/user-repository'
import { OAuthAuthorizeController } from '../../presentation/controllers/oauth/authorize'
import { type Controller } from '../../presentation/protocols'
import { prismaClient } from '../server'

export const makeOAuthAuthorizeController = (): Controller => {
  const googleAuth = new GoogleUserRepository()
  const accountRepository = new AccountPrismaRepository(prismaClient)
  const encrypter = new JwtAdapter('secret')
  const generatePayloadSession = new PayloadGenerator(encrypter)
  const authenticate = new DbAuthenticate(
    googleAuth,
    accountRepository,
    accountRepository,
    generatePayloadSession,
    accountRepository
  )
  return new OAuthAuthorizeController(authenticate)
}

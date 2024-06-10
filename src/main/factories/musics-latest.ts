import { DbLoadMusicsLatest } from '../../data/usecases/db-load-musics-latest/db-load-musics-latest'
import { LoadMusicsLatestPrismaRepository } from '../../infra/db/prisma/load-musics-latest'
import { MusicsLatestController } from '../../presentation/controllers/musics/latest/musicsLatest'
import { type Controller } from '../../presentation/protocols'
import { prismaClient } from '../server'

export const makeMusicsLatestController = (): Controller => {
  const loadMusicsLatestRepository = new LoadMusicsLatestPrismaRepository(prismaClient)
  const musicLatest = new DbLoadMusicsLatest(loadMusicsLatestRepository)
  return new MusicsLatestController(musicLatest)
}

import { type PrismaClient } from '@prisma/client'
import { LoadPlayerPairProcessDownload } from '../../data/usecases/load-player-pair-process-download/load-player-pair-process-download'
import { CheckLocalPlayerPairProcessDownloadFSRepository } from '../../infra/archives/fs/check-local-player-pair-process-download'
import { LoadPlayerPairProcessDownloadFSRepository } from '../../infra/archives/fs/load-player-pair-process-download'
import { LoadMusicByIdPrismaRepository } from '../../infra/db/prisma/load-music-by-id'
import { YoutubeDownloadRepository } from '../../infra/youtube/download'
import { SoundcloudDownloadRepository } from '../../infra/soundcloud/download'

export const makeDownloadUsecase = (prismaClient: PrismaClient): LoadPlayerPairProcessDownload => {
  const checkLocalPlayerPairProcessDownloadRepository = new CheckLocalPlayerPairProcessDownloadFSRepository()
  const loadLocalPlayerPairProcessDownloadRepository = new LoadPlayerPairProcessDownloadFSRepository()
  const loadMusicByIdRepository = new LoadMusicByIdPrismaRepository(prismaClient)

  const loadYoutubePlayerPairProcessDownloadRepository = new YoutubeDownloadRepository()
  const loadSoundcloudPlayerPairProcessDownloadRepository = new SoundcloudDownloadRepository()
  return new LoadPlayerPairProcessDownload(
    checkLocalPlayerPairProcessDownloadRepository,
    loadLocalPlayerPairProcessDownloadRepository,
    loadMusicByIdRepository,
    [
      loadYoutubePlayerPairProcessDownloadRepository,
      loadSoundcloudPlayerPairProcessDownloadRepository
    ]
  )
}

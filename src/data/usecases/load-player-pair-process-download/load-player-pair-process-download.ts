import EventEmitter from 'events'
import { type PlayerPairProcessDownload } from '../../../domain/usecases/player-pair-process-download'
import { type LoadPlayerPairProcessDownloadRepository } from '../../protocols/LoadPlayerPairProcessDownloadRepository'
import { type CheckLocalPlayerPairProcessDownloadRepository } from '../../protocols/CheckLocalPlayerPairProcessDownloadRepository'
import { type SaveLocalPlayerPairProcessDownloadRepository } from '../../protocols/SaveLocalPlayerPairProcessDownloadRepository'
import { type LoadMusicByIdRepository } from '../../protocols/LoadMusicByIdRepository'

export class LoadPlayerPairProcessDownload implements PlayerPairProcessDownload {
  eventEmitter: EventEmitter = new EventEmitter()

  constructor (
    private readonly checkLocalPlayerPairProcessDownloadRepository: CheckLocalPlayerPairProcessDownloadRepository,
    private readonly loadLocalPlayerPairProcessDownloadRepository: LoadPlayerPairProcessDownloadRepository,
    private readonly loadMusicByIdRepository: LoadMusicByIdRepository,
    private readonly loadPlayerPairProcessDownloadRepository: LoadPlayerPairProcessDownloadRepository,
    private readonly saveLocalPlayerPairProcessDownloadRepository: SaveLocalPlayerPairProcessDownloadRepository
  ) {}

  async download (download: PlayerPairProcessDownload.Params): Promise<void> {
    const music = await this.loadMusicByIdRepository.load({
      id: download.id
    })
    if (!music) {
      throw new Error('Music not found')
    }
    const exists = await this.checkLocalPlayerPairProcessDownloadRepository.check({
      id: download.id
    })
    if (exists) {
      await this.loadLocalPlayerPairProcessDownloadRepository.load({
        eventEmitter: this.eventEmitter,
        id: download.id,
        initialChunk: download.initialChunk,
        finalChunk: download.finalChunk
      })
      return
    }
    const buffer = await this.loadPlayerPairProcessDownloadRepository.load({
      eventEmitter: this.eventEmitter,
      id: music.partnerId,
      initialChunk: 0
    })
    await this.saveLocalPlayerPairProcessDownloadRepository.save({
      buffer,
      id: download.id
    })
  }
}

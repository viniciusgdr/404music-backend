import { type SaveMusic } from '../../../domain/usecases/save-music'
import { type SaveLocalPlayerPairProcessDownloadRepository } from '../../protocols/SaveLocalPlayerPairProcessDownloadRepository'

export class DbSaveMusic implements SaveMusic {
  constructor (
    private readonly saveLocalPlayerPairProcessDownloadRepository: SaveLocalPlayerPairProcessDownloadRepository
  ) {}

  async save (music: SaveMusic.Params): Promise<void> {
    await this.saveLocalPlayerPairProcessDownloadRepository.save({
      id: music.id,
      buffer: music.buffer,
      PATH: music.PATH
    })
  }
}

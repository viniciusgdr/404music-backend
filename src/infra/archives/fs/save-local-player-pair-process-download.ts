import { type SaveLocalPlayerPairProcessDownloadRepository } from '../../../data/protocols/SaveLocalPlayerPairProcessDownloadRepository'
import fs from 'fs'

export class SaveLocalPlayerPairProcessDownloadFSRepository implements SaveLocalPlayerPairProcessDownloadRepository {
  async save (download: SaveLocalPlayerPairProcessDownloadRepository.Params): Promise<void> {
    const { id, buffer } = download
    const path = `./public/musics/${id}`
    const exists = fs.existsSync(path)
    if (!exists) {
      fs.writeFileSync(path, buffer)
    }
  }
}

import { type CheckLocalPlayerPairProcessDownloadRepository } from '../../../data/protocols/CheckLocalPlayerPairProcessDownloadRepository'
import fs from 'fs'

export class CheckLocalPlayerPairProcessDownloadFSRepository implements CheckLocalPlayerPairProcessDownloadRepository {
  async check (download: CheckLocalPlayerPairProcessDownloadRepository.Params): Promise<CheckLocalPlayerPairProcessDownloadRepository.Result> {
    const { id } = download
    const path = `public/musics/${id}`
    const exists = fs.existsSync(path)
    return exists
  }
}

import { type CheckLocalPlayerPairProcessDownloadRepository } from '../../../data/protocols/CheckLocalPlayerPairProcessDownloadRepository'
import fs from 'fs'

export class CheckLocalPlayerPairProcessDownloadFSRepository implements CheckLocalPlayerPairProcessDownloadRepository {
  async check (download: CheckLocalPlayerPairProcessDownloadRepository.Params): Promise<CheckLocalPlayerPairProcessDownloadRepository.Result> {
    const { id } = download
    const pathMain = __dirname.replace('.next/server/pages/api/music', '')
      .replace('.next/server/pages/api/queue', '')
    const path = pathMain + `public/musics/${id}.mp3`
    const exists = fs.existsSync(path)
    return exists
  }
}

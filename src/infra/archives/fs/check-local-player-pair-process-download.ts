import { type CheckLocalPlayerPairProcessDownloadRepository } from '../../../data/protocols/CheckLocalPlayerPairProcessDownloadRepository'
import fs from 'fs'
import path from 'path'

export class CheckLocalPlayerPairProcessDownloadFSRepository implements CheckLocalPlayerPairProcessDownloadRepository {
  async check (download: CheckLocalPlayerPairProcessDownloadRepository.Params): Promise<CheckLocalPlayerPairProcessDownloadRepository.Result> {
    const { id } = download
    const pathMain = path.join(process.cwd(), 'public', 'musics')
    const pathStr = pathMain + `/${id}.mp3`
    const exists = fs.existsSync(pathStr)
    return exists
  }
}

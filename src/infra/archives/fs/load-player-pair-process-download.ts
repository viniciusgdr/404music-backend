import { type LoadPlayerPairProcessDownloadRepository } from '../../../data/protocols/LoadPlayerPairProcessDownloadRepository'
import fs from 'fs'
export class LoadPlayerPairProcessDownloadFSRepository implements LoadPlayerPairProcessDownloadRepository {
  async load (download: LoadPlayerPairProcessDownloadRepository.Params): Promise<LoadPlayerPairProcessDownloadRepository.Result> {
    const { id } = download
    const pathMain = __dirname.replace('.next/server/pages/api/music', '')
      .replace('.next/server/pages/api/queue', '')
    const path = pathMain + `public/musics/${id}.mp3`
    const exists = fs.statSync(path)
    if (exists.isFile()) {
      const stream = fs.createReadStream(path)
      return {
        stream,
        size: exists.size
      }
    }
    throw new Error('File not found')
  }
}

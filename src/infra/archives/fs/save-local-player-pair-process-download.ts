import { type SaveLocalPlayerPairProcessDownloadRepository } from '../../../data/protocols/SaveLocalPlayerPairProcessDownloadRepository'
import fs from 'fs'

export class SaveLocalPlayerPairProcessDownloadFSRepository implements SaveLocalPlayerPairProcessDownloadRepository {
  async save (download: SaveLocalPlayerPairProcessDownloadRepository.Params): Promise<void> {
    const { id, buffer } = download
    const pathExists = fs.existsSync(process.cwd() + '/public/musics')
    if (!pathExists) {
      fs.mkdirSync(process.cwd() + '/public/musics')
    }
    const path = process.cwd() + `/public/musics/${id}.mp3`
    const exists = fs.existsSync(path)
    if (!exists) {
      fs.writeFileSync(path, buffer)
    }
  }
}

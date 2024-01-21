import { type LoadPlayerPairProcessDownloadRepository } from '../../../data/protocols/LoadPlayerPairProcessDownloadRepository'
import fs from 'fs'
export class LoadPlayerPairProcessDownloadFSRepository implements LoadPlayerPairProcessDownloadRepository {
  async load (download: LoadPlayerPairProcessDownloadRepository.Params): Promise<Buffer> {
    const { id, eventEmitter } = download
    const path = `./public/musics/${id}`
    const exists = fs.existsSync(path)
    if (exists) {
      const stream = fs.createReadStream(path)
      let totalDownloaded = 0
      const totalSize = fs.statSync(path).size
      const buffer: Buffer[] = []
      stream.on('data', (chunk) => {
        totalDownloaded += chunk.length
        eventEmitter.emit('data', {
          downloaded: totalDownloaded,
          total: totalSize,
          progress: Number(((totalDownloaded / totalSize) * 100).toFixed(2)),
          buffer: Buffer.concat(buffer)
        })
      })
      stream.on('end', () => {
        eventEmitter.emit('end')
      })
      return Buffer.concat(buffer)
    }
    throw new Error('File not found')
  }
}

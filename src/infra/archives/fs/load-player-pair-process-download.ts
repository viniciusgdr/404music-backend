import { type LoadPlayerPairProcessDownloadRepository } from '../../../data/protocols/LoadPlayerPairProcessDownloadRepository'
import fs from 'fs'
export class LoadPlayerPairProcessDownloadFSRepository implements LoadPlayerPairProcessDownloadRepository {
  async load (download: LoadPlayerPairProcessDownloadRepository.Params): Promise<Buffer> {
    return await new Promise((resolve, reject) => {
      const { id, eventEmitter, initialChunk, finalChunk } = download
      const path = `./public/musics/${id}.mp3`
      const exists = fs.existsSync(path)
      if (exists) {
        const stream = fs.createReadStream(path)
        let totalDownloaded = 0
        const totalSize = fs.statSync(path).size
        const buffer: Buffer[] = []
        let sendedFinishedChunk = false
        stream.on('data', (chunk) => {
          totalDownloaded += chunk.length
          buffer.push(chunk as Buffer)
          eventEmitter.emit('data', {
            downloaded: totalDownloaded,
            total: totalSize,
            progress: Number(((totalDownloaded / totalSize) * 100).toFixed(2)),
            buffer: Buffer.concat(buffer)
          })
          if (totalDownloaded >= initialChunk && totalDownloaded >= (finalChunk ?? 0) && !sendedFinishedChunk) {
            sendedFinishedChunk = true
            eventEmitter.emit('finished_chunk', {
              buffer: Buffer.concat(buffer.slice(initialChunk, finalChunk))
            })
          }
        })
        stream.on('end', () => {
          eventEmitter.emit('end')
          resolve(Buffer.concat(buffer))
        })
      }
      throw new Error('File not found')
    })
  }
}

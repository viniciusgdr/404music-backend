import { type LoadPlayerPairProcessDownloadRepository } from '../../data/protocols/LoadPlayerPairProcessDownloadRepository'
import ytdl from 'ytdl-core'

export class YoutubeDownloadRepository implements LoadPlayerPairProcessDownloadRepository {
  async load (load: LoadPlayerPairProcessDownloadRepository.Params): Promise<Buffer> {
    const { id, eventEmitter } = load
    const info = await ytdl.getInfo(id)
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly')
    if (audioFormats.length === 0) {
      throw new Error('No audio formats found')
    }
    const audio = audioFormats[0]
    const audioSize = Number(audio.contentLength)
    const stream = ytdl.downloadFromInfo(info, {
      format: audio
    })
    const buffer: Buffer[] = []
    let totalDownloaded = 0
    stream.on('data', (chunk) => {
      buffer.push(chunk)
      totalDownloaded += chunk.length as number
      eventEmitter.emit('data', {
        downloaded: totalDownloaded,
        total: audioSize,
        progress: Number(((totalDownloaded / audioSize) * 100).toFixed(2)),
        buffer: Buffer.concat(buffer)
      })
    })
    stream.on('end', () => {
      eventEmitter.emit('end')
    })
    return Buffer.concat(buffer)
  }
}

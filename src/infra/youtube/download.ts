import { type LoadPlayerPairProcessDownloadRepository } from '../../data/protocols/LoadPlayerPairProcessDownloadRepository'
import ytdl from 'ytdl-core'

export class YoutubeDownloadRepository implements LoadPlayerPairProcessDownloadRepository {
  async load (load: LoadPlayerPairProcessDownloadRepository.Params): Promise<LoadPlayerPairProcessDownloadRepository.Result> {
    const { id } = load
    const info = await ytdl.getInfo(id)
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly')
    if (audioFormats.length === 0) {
      throw new Error('No audio formats found')
    }
    const audio = audioFormats[0]
    const stream = ytdl.downloadFromInfo(info, {
      format: audio
    })
    return {
      stream,
      size: Number(audio.contentLength)
    }
  }
}

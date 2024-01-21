import { type EventEmitter } from 'node:events'

export interface LoadPlayerPairProcessDownloadRepository {
  load: (load: LoadPlayerPairProcessDownloadRepository.Params) => Promise<Buffer>
}

export namespace LoadPlayerPairProcessDownloadRepository {
  export interface Params {
    id: string
    eventEmitter: EventEmitter
    initialChunk: number
    finalChunk?: number
  }
}

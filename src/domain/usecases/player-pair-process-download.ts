export interface PlayerPairProcessDownload {
  download: (download: PlayerPairProcessDownload.Params) => Promise<void>
}

export namespace PlayerPairProcessDownload {
  export interface Params {
    id: string
    initialChunk: number
    finalChunk?: number
  }
}

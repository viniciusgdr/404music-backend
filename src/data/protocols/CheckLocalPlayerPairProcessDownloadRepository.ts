export interface CheckLocalPlayerPairProcessDownloadRepository {
  check: (check: CheckLocalPlayerPairProcessDownloadRepository.Params) => Promise<CheckLocalPlayerPairProcessDownloadRepository.Result>
}

export namespace CheckLocalPlayerPairProcessDownloadRepository {
  export interface Params {
    id: string
  }

  export type Result = boolean
}

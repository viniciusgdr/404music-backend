export interface MusicAlreadyOnDB {
  check: (id: string) => Promise<boolean>
}

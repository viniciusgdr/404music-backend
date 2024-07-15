import { type GetUserInfoRepository } from '../../../data/protocols/db/GetUserInfoRepository'

export class GoogleUserRepository implements GetUserInfoRepository {
  async load ({ code }: GetUserInfoRepository.Params): Promise<GetUserInfoRepository.Result> {
    try {
      const user = await this.getUserInfo(code)
      if (user?.error) {
        return null
      }
      return user
    } catch (error) {
      console.log(error)
      return null
    }
  }

  private async getUserInfo (token: string): Promise<any> {
    const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const user = await response.json()
    return user
  }
}

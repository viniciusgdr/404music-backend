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

  private async getToken (code: string): Promise<string> {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code,
        client_id: process.env.CLIENT_ID_GOOGLE,
        client_secret: process.env.CLIENT_SECRET_GOOGLE,
        redirect_uri: process.env.REDIRECT_URI_GOOGLE,
        grant_type: 'authorization_code'
      })
    })
    const data = await response.json()
    return data.access_token
  }

  private async getUserInfo (token: string): Promise<any> {
    const code = await this.getToken(token)
    const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${code}`
      }
    })
    const user = await response.json()
    return user
  }
}

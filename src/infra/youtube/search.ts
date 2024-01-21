import { type SearchRepository } from '../../data/protocols/SearchRepository'
import fetch from 'node-fetch'

export class YoutubeSearchRepository implements SearchRepository {
  private async _POST (query: string, continuationToken?: string): Promise<any> {
    const body = {
      context: {
        client: {
          hl: 'pt',
          gl: 'BR',
          remoteHost: '181.174.208.179',
          deviceMake: '',
          deviceModel: '',
          visitorData: 'Cgs2VlJpWXcxUFF3USi4vbGtBjIKCgJCUhIEGgAgKQ%3D%3D',
          userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36,gzip(gfe)',
          clientName: 'WEB',
          clientVersion: '2.20240119.01.00',
          osName: 'X11',
          osVersion: '',
          originalUrl: `https://music.youtube.com/results?search_query=${query}`,
          platform: 'DESKTOP',
          clientFormFactor: 'UNKNOWN_FORM_FACTOR',
          configInfo: {
            appInstallData: 'CLi9sa0GEIiHsAUQnqCwBRC34K4FENWIsAUQt6qwBRDM364FELz5rwUQ4tSuBRD0q7AFEL2ZsAUQzK7-EhDrk64FEJT8rwUQiOOvBRCY_P4SEN3o_hIQvvmvBRCu1P4SENnJrwUQl4OwBRDfhP8SEM-osAUQvbauBRDh8q8FENyCsAUQ0I2wBRComrAFELfvrwUQ-5KwBRC3q7AFENuvrwUQooGwBRCspbAFEOSz_hIQ86GwBRDOi_8SEL6KsAUQ5aiwBRCei7AFEL-jsAUQyqqwBRDuorAFEM2VsAUQqfevBRDr6P4SEMn3rwUQ7qKvBRDnuq8FEOrDrwUQ0-GvBRCmmrAFEKy3rwUQ2piwBRCJ6K4FEPqnsAUQuIuuBRCa8K8FEP2nsAUQg9-vBRCmgbAFENShrwUQ_IWwBRD1-a8FEISC_xIQpJCwBRDX6a8FELfq_hIQ9auwBRClwv4SEPiqsAUQnqSwBRDU6K8FEIKssAU%3D'
          },
          userInterfaceTheme: 'USER_INTERFACE_THEME_DARK',
          timeZone: 'America/Sao_Paulo',
          browserName: 'Chrome',
          browserVersion: '120.0.0.0',
          acceptHeader: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          deviceExperimentId: 'ChxOek15TmpNek5EZ3pPVGN3Tmpjek9EWTROQT09ELi9sa0GGLi9sa0G',
          screenWidthPoints: 962,
          screenHeightPoints: 1010,
          screenPixelDensity: 1,
          screenDensityFloat: 1,
          utcOffsetMinutes: -180,
          memoryTotalKbytes: '4000000',
          mainAppWebInfo: {
            graftUrl: `/results?search_query=${query}`,
            pwaInstallabilityStatus: 'PWA_INSTALLABILITY_STATUS_CAN_BE_INSTALLED',
            webDisplayMode: 'WEB_DISPLAY_MODE_BROWSER',
            isWebNativeShareAvailable: false
          }
        },
        user: {
          lockedSafetyMode: false
        },
        request: {
          useSsl: true,
          internalExperimentFlags: [],
          consistencyTokenJars: []
        },
        clickTracking: {
          clickTrackingParams: 'CBUQ7VAiEwjp7MPClu2DAxWdgpUCHUmFCRY='
        }
      }
    }
    const request = await fetch('https://music.youtube.com/youtubei/v1/search?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false', {
      headers: {
        accept: '*/*',
        'accept-language': 'pt-BR,pt;q=0.5',
        'content-type': 'application/json',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Brave";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-model': '""',
        'sec-ch-ua-platform': '"Linux"',
        'sec-ch-ua-platform-version': '"6.6.11"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'same-origin',
        'sec-fetch-site': 'same-origin',
        'sec-gpc': '1',
        'x-goog-authuser': '0',
        'x-goog-visitor-id': 'Cgs2VlJpWXcxUFF3USi4vbGtBjIKCgJCUhIEGgAgKQ%3D%3D',
        'x-origin': 'https://music.youtube.com',
        'x-youtube-bootstrap-logged-in': 'true',
        'x-youtube-client-name': '1',
        'x-youtube-client-version': '2.20240119.01.00',
        Referer: `https://music.youtube.com/results?search_query=${query}`,
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      },
      body: JSON.stringify({
        ...body,
        continuation: continuationToken ?? undefined,
        query: continuationToken ? undefined : query
      }),
      method: 'POST'
    })
    const json = await request.json()
    return json
  }

  async search (search: SearchRepository.Params): Promise<SearchRepository.Result[]> {
    const json = await this._POST(search.query)
    const result = json.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents
    // const continuationCommands = json.header.searchHeaderRenderer.chipBar.chipCloudRenderer.chips.filter((item: any) => item.chipCloudChipRenderer).map((item: any) => item.chipCloudChipRenderer)
    // const continuationVideos = continuationCommands.find((item: any) => item.text.simpleText === 'Vídeos')
    // const continuation = continuationVideos.navigationEndpoint.continuationCommand.token
    // console.log(continuation)
    if (result) {
      const inVideoRenderer = result.filter((item: any) => item?.videoRenderer).map((item: any) => item.videoRenderer)
      return inVideoRenderer.map((item: any) => {
        const thumb = item.thumbnail.thumbnails[0].url
        return {
          partnerId: item.videoId,
          title: item.title.runs[0].text,
          artist: item.ownerText.runs[0].text,
          thumbnail: thumb.substring(0, thumb.indexOf('?')),
          album: '',
          genre: '',
          year: 0
        } satisfies SearchRepository.Result
      })
    }
    return []
  }
}

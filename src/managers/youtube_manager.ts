import BaseApiResponse from '@/response/base_api_response'
import api_factory from '@/api/api_factory'

export default class YoutubeManager {
  static api_key: string = 'AIzaSyDpVzijXYtuFgFK4-HsLmSkrBSDGfuBvpE'

  private static getIdFromLink(link: string): string {
    if (link.includes('watch?v')) {
      return link.substring(link.indexOf('=') + 1, link.indexOf('&'))
    }

    return link.substring(17)
  }

  public static async getInfoFromLink(link: string): Promise<VideoApiInfo> {
    const url: string =
      '/videos?part=id%2C+snippet&id=' + this.getIdFromLink(link) + '&key=' + this.api_key

    const response: BaseApiResponse<string> = await api_factory.getInstance().get<string>(url)

    const data = JSON.parse(JSON.stringify(response.data))

    const title = data.items[0].snippet.title
    const channelTitle = data.items[0].snippet.channelTitle

    return { title: title, channelTitle: channelTitle }
  }
}

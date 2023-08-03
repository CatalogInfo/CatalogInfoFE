import BaseApiResponse from '@/response/base_api_response'
import YoutubeApi from "../api/youtube_api";

export default class YoutubeManager {
  static baseURL = 'https://www.googleapis.com/youtube/v3';
  static api_key: string = 'AIzaSyDpVzijXYtuFgFK4-HsLmSkrBSDGfuBvpE'

  private static getIdFromLink(link: string): string {
    if (link.includes('watch?v')) {
      return link.substring(link.indexOf('=') + 1, link.indexOf('&'))
    }

    return link.substring(17)
  }

  public static async getInfoFromLink(link: string): Promise<VideoApiInfo> {

    const id = this.getIdFromLink(link);

    const response: BaseApiResponse<string> = await YoutubeApi.getVideoById(id, this.api_key)

    const data = JSON.parse(JSON.stringify(response.data))

    const title = data.items[0].snippet.title
    const channelTitle = data.items[0].snippet.channelTitle

    return { id: id, title: title, channelTitle: channelTitle }
  }
}

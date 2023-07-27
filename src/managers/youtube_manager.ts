import BaseApiResponse from "@/response/base_api_response";
import api_factory from "@/api/api_factory";

export default class YoutubeManager {

  static api_key: string = "AIzaSyDpVzijXYtuFgFK4-HsLmSkrBSDGfuBvpE";

  private static getIdFromLink(link: string): string {
    if (link.includes("watch?v")) {
      return link.substring(link.indexOf('=') + 1, link.indexOf('&'));
    }

    return link.substring(17);
  }

  public static async getInfoFromLink(link: string) {
    const url: string = "/videos?part=id%2C+snippet&id=" 
    + this.getIdFromLink(link) 
    + "&key=" + YoutubeManager.api_key;
    
    const response: BaseApiResponse<string> = await api_factory.getInstance().get<string>(url);
    const dataString: string = response.data.toString();
    const data = JSON.parse(dataString);
    // console.log(data.items);
  }
}
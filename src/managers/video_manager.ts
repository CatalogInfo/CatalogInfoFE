import Video from '@/models/video'
import Category from '@/models/category'
import { Collection, useRepo } from 'pinia-orm'
import store from '../store/store'
import YoutubeManager from '@/managers/youtube_manager'
import VideoResponse from "../dtos/video_response";
import CategoryApi from '@/api/category_api'
import BaseApiResponse from '@/response/base_api_response'

export default class VideoManager {
  protected static get repository() {
    return useRepo(Video, store)
  }

  static all(): Collection<Video> {
    return this.repository.all()
  }

  static getVideoById(id: number): Video | null {
    return this.repository.find(id)
  }

  static async loadAll(categoryId: number) {
    const response: BaseApiResponse<VideoResponse> = await CategoryApi.getVideos(categoryId) as BaseApiResponse<VideoResponse>;
    const videos: Array<VideoResponse> = JSON.parse(JSON.stringify(response.data));

    console.log(videos);
    this.repository.save(this.getFormatedVideos(videos));
  }

  static getFormatedVideos(books: Array<VideoResponse>) {
    return books.map(this.getFormatedVideo);
  }

  static getFormatedVideo(video: VideoResponse) {
    // const category = CategoryManager.getCategoryById(book.category) as Category
    return {
      id: video.id,
      link: video.link,
      title: video.title,
      channelTitle: video.channelTitle,
    };
  }

  static getVideoByCategory(categoryId: number): Video[] | null {
    const videos = this.repository
      .where('category', (value: Category) => {
        return value.id === categoryId
      })
      .get()
    return videos
  }

  static async createVideo(link: string, category: Category) {
    if (link != '' && link != null && link != undefined) {
      const info: VideoApiInfo = await YoutubeManager.getInfoFromLink(link)
      console.log(info.id);

      const video = {
        id: info.id,
        link: link,
        title: info.title,
        channelTitle: info.channelTitle
      };

      const response = await CategoryApi.createVideo(category.id, video);
      const bookRes: VideoResponse = JSON.parse(JSON.stringify(response.data));
      const der = this.getFormatedVideo(bookRes);

      this.repository.save(der);

    }
  }
}

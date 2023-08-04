import Video from '@/models/video'
import Category from '@/models/category'
import { Collection, useRepo } from 'pinia-orm'
import store from '../store/store'
import YoutubeManager from '@/managers/youtube_manager'
import VideoResponse from '../dtos/responses/video_response'
import CategoryApi from '@/api/category_api'
import BaseApiResponse from '@/response/base_api_response'
import CategoryManager from './category_manager'

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
    const response: BaseApiResponse<VideoResponse> = (await CategoryApi.getVideos(
      categoryId
    )) as BaseApiResponse<VideoResponse>
    const videos: Array<VideoResponse> = JSON.parse(JSON.stringify(response.data))

    this.repository.save(this.getFormatedVideos(videos))
  }

  private static getFormatedVideos(books: Array<VideoResponse>) {
    return books.map(this.getFormatedVideo)
  }

  private static getFormatedVideo(video: VideoResponse) {
    return {
      id: video.id,
      link: video.link,
      title: video.title,
      channelTitle: video.channelTitle
    }
  }

  static getVideoByCategory(categoryId: number): Video[] | null {
    const videos = this.repository
      .where('category', (value: Category) => {
        return value.id === categoryId
      })
      .get()
    return videos
  }

  static async createVideo(link: string, categoryId: number) {
    if (link != '' && link != null && link != undefined) {
      const info: YoutubeRequest = await YoutubeManager.getInfoFromLink(link)

      const video = {
        id: info.id,
        link: link,
        title: info.title,
        channelTitle: info.channelTitle
      }

      const videoRes = await CategoryApi.createVideo(categoryId, video)
      const videoEntity = this.getFormatedVideo(videoRes.data)

      this.repository.save(videoEntity)
      await CategoryManager.loadAll();
    }
  }
}

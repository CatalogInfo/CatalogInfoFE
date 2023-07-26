import Video from '@/models/video'
import Category from '@/models/category'
import { Collection, useRepo } from 'pinia-orm'
import store from '../store/store'
import VideoData from '@/data/video_data'

export default class VideoManager {
  protected static get repository() {
    return useRepo(Video, store)
  }

  static all(): Collection<Video> {
    return this.repository.all()
  }

  static getVideoById(id: string): Video | null {
    return this.repository.find(id)
  }

  static getVideoByCategory(categoryId: string): Video[] | null {
    const videos = this.repository
      .where('category', (value: Category) => {
        return value.id === categoryId
      })
      .get()
    return videos
  }

  static createVideo(video: VideoData) {
    this.repository.save(video)
  }
}

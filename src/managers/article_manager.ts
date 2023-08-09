import CategoryApi from '@/api/category_api'
import Article from '@/models/article'
import { Collection, useRepo } from 'pinia-orm'
import store from '../store/store'
import ArticleResponse from '@/dtos/responses/article_response';
import CategoryManager from './category_manager';
import ArticleRequest from '@/dtos/requests/article_request';

export default class ArticleManager {
  protected static get repository() {
    return useRepo(Article, store)
  }

  static all(): Collection<Article> {
    return this.repository.all()
  }

  static async loadAll(categoryId: number) {
    const response = await CategoryApi.getArticles(categoryId)
    const articles = response.data

    this.repository.save(this.getFormatedArticles(articles))

  }

  static getArticleById(id: number): Article | null {
    return this.repository.find(id)
  }

  static async createArticle(article: ArticleRequest, categoryId: number) {
    const response = await CategoryApi.createArticle(article, categoryId)
    const articleEntity = this.getFormatedArticle(response.data)

    this.repository.save(articleEntity)
    await CategoryManager.loadAll();
  }

  private static getFormatedArticles(articles: Array<ArticleResponse>) {
    return articles.map(this.getFormatedArticle)
  }

  private static getFormatedArticle(article: ArticleResponse) {
    return {
      id: article.id,
      link: article.link,
      title: article.title,
    }
  }

  public static async deleteArticle(articleId: number, categoryId: number) {
    await CategoryApi.deleteArticle(categoryId, articleId);
    await CategoryManager.loadAll();
  }
}

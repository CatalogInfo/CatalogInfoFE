import { HttpMethod } from '@/enums/http_method'

export default class ApiUtils {
  static httpMethodToString(method: HttpMethod) {
    switch (method) {
      case HttpMethod.GET:
        return 'GET'
      case HttpMethod.POST:
        return 'POST'
      case HttpMethod.PUT:
        return 'PUT'
      case HttpMethod.DELETE:
        return 'DELETE'
      default:
        throw new Error(`Unknown HttpMethod: ${method}`)
    }
  }
}

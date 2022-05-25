export class APIEndpointURLs {
  private static readonly baseUrl = '/java-api/api';

  // User
  public static readonly userUrl = APIEndpointURLs.baseUrl + '/user';
  public static readonly allUser = APIEndpointURLs.userUrl + '/all';
  public static readonly auth = APIEndpointURLs.baseUrl + '/auth';
  public static readonly authLogin = APIEndpointURLs.auth + '/login';
}

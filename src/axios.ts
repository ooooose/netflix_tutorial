import axiosBase, { AxiosInstance, AxiosResponse } from 'axios';

class ApiClient {
  axios: AxiosInstance;

  constructor() {
    this.axios = axiosBase.create({
      baseURL: process.env.REACT_APP_TMDB_BASE_URL,
      responseType: 'json',
    });
  }

  async apiGet(url: string, query = {}): Promise<AxiosResponse> {
    return await this.axios.get(url, { ...query });
  }
}

export const apiClient = new ApiClient();

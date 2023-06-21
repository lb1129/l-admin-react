import 'axios'

declare module 'axios' {
  export interface AxiosInstance {
    <T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R['data']>
    <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<
      R['data']
    >
    request<T = any, R = AxiosResponse<T>, D = any>(
      config: AxiosRequestConfig<D>
    ): Promise<R['data']>
    get<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      config?: AxiosRequestConfig<D>
    ): Promise<R['data']>
    delete<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      config?: AxiosRequestConfig<D>
    ): Promise<R['data']>
    head<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      config?: AxiosRequestConfig<D>
    ): Promise<R['data']>
    options<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      config?: AxiosRequestConfig<D>
    ): Promise<R['data']>
    post<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>
    ): Promise<R['data']>
    put<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>
    ): Promise<R['data']>
    patch<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>
    ): Promise<R['data']>
    postForm<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>
    ): Promise<R['data']>
    putForm<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>
    ): Promise<R['data']>
    patchForm<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>
    ): Promise<R['data']>
  }
}

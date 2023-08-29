import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Toast } from 'antd-mobile'
import { checkoutStatus } from "@/utils";

type Result<T> = {
    code: number;
    message: string;
    data: T;
    success?: boolean
};

// 导出Request类，可以用来自定义传递配置来创建实例
export class Request {
    // axios 实例
    instance: AxiosInstance;
    // 基础配置，url和超时时间
    baseConfig: AxiosRequestConfig = {
        baseURL: '', timeout: 60000,
    };

    constructor(config: AxiosRequestConfig) {
        // 使用axios.create创建axios实例
        this.instance = axios.create(Object.assign(this.baseConfig, config));
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                // 一般会请求拦截里面加token，用于后端的验证
                const token = localStorage.getItem("token") as string
                config.headers!.token = 'tt_YL4fy9Ys51RbWQrZ2nfePLNuwibSc0AJ.a48384085256df83c972ca1e60b9d329';
                config.headers!['Accept-Language'] = localStorage.getItem("locale") || 'VIE';
                if (token) {
                    config.headers!.Authorization = token;
                }
                //特别路径
                if (config.url.includes('match/sportUnionData')) {
                    config.baseURL = 'https://pxdd.bbywwp5142l9a9.com/';
                } else if (config.url.includes('TextLive') || config.url.includes('matchInfo')) {
                    config.baseURL = 'https://push.bbyw43d5l873a1.com/';
                }
                else if (config.url.includes('batchBetMatchMarketOfJumpLine')) {
                    config.baseURL = '';
                }
                return config;
            },
            (err: any) => {
                // 请求错误，这里可以用全局提示框进行提示
                return Promise.reject(err);
            }
        );

        this.instance.interceptors.response.use(
            (res: AxiosResponse) => {
                // 系统如果有自定义code也可以在这里处理
                if (res.data.code === 14010) {
                    Toast.show({
                        content: res.data.msg,
                        position: 'top',
                    })
                }
                return res.data;
            },
            (err: any) => {
                // 这里用来处理http常见错误，进行全局提示
                let message: string = checkoutStatus(err)

                // 这里错误消息可以使用全局弹框展示出来
                Toast.show({
                    content: message,
                    position: 'top',
                })
                // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
                return Promise.reject(err.response);
            }
        );
    }

    public request<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.instance.request(config);
    }

    public get<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<Result<T>> {
        return this.instance.get(url, config);
    }

    public post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<Result<T>> {
        return this.instance.post(url, data || {}, config);
    }

    public put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<Result<T>> {
        return this.instance.put(url, data, config);
    }

    public delete<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<Result<T>> {
        return this.instance.delete(url, config);
    }
}

export default new Request({})
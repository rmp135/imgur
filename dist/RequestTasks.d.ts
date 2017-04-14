import { AxiosRequestConfig } from 'axios';
import Client from './Client';
export interface URLConfig {
    path: any[];
    params?: {
        [key: string]: any;
    };
}
export declare function performRequest<T>(client: Client, config: AxiosRequestConfig): Promise<T>;
export declare function performAPIRequest<T>(client: Client, url: URLConfig | any[], axiosConfig?: AxiosRequestConfig): Promise<APIResponse<T>>;
export declare function joinURL(urlToJoin: URLConfig | string[]): string;

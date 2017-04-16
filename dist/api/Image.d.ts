/// <reference types="node" />
import Client from '../Client';
export interface UploadOptions {
    title?: string;
    type?: UploadType;
    album?: string;
    name?: string;
    description?: string;
}
export declare type UploadType = 'base64' | 'url';
export interface UpdateOptions {
    title?: string;
    description?: string;
}
export declare function get(client: Client, imageId: string): Promise<APIResponse<ImageResponse>>;
export declare function upload(client: Client, image: string | Buffer, options?: UploadOptions): Promise<APIResponse<ImageResponse>>;
export declare function remove(client: Client, id: string): Promise<APIResponse<boolean>>;
export declare function update(client: Client, imageId: string, options: UpdateOptions): Promise<APIResponse<boolean>>;
export declare function favorite(client: Client, imageId: string): Promise<APIResponse<boolean>>;

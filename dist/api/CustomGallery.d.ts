import Client from '../Client';
export declare function get(client: Client, options?: Options.PageOption & Options.GallerySortOption & Options.WindowOption): Promise<APIResponse<CustomGalleryResponse>>;
export declare function image(client: Client, itemId: string): Promise<APIResponse<BaseImageResponse>>;
export declare function addTags(client: Client, tags: string[]): Promise<APIResponse<boolean>>;
export declare function removeTage(client: Client, tags: string[]): Promise<APIResponse<boolean>>;

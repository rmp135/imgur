import Client from '../Client';
export declare function defaults(client: Client): Promise<APIResponse<TopicResponse[]>>;
export declare function galleryTopics(client: Client, topicId: string, options?: Options.GallerySortOption & Options.PageOption & Options.WindowOption): Promise<APIResponse<BaseGalleryResponse[]>>;
export declare function topicItem(client: Client, topicId: string, itemId: string): Promise<APIResponse<BaseGalleryResponse>>;

import * as Options from '../Options';
import Client from "../Client";
export declare function get(client: Client, options?: Options.GalleryGetOptions): Promise<APIResponse<BaseGalleryResponse[]>>;
export declare function memesGallery(client: Client, options?: Options.GallerySortOption & Options.PageOption & Options.WindowOption): Promise<APIResponse<(BaseGalleryResponse & MemeResponse)[]>>;
export declare function memesImage(client: Client, imageId: string): Promise<APIResponse<BaseGalleryResponse & MemeResponse>>;
export declare function subredditGalleries(client: Client, subreddit: string, options?: Options.SubredditGalleryOptions): Promise<APIResponse<SubRedditGalleriesResponse[]>>;
export declare function subredditImage(client: Client, subreddit: string, imageId: string): Promise<APIResponse<SubRedditGalleriesResponse>>;
export declare function tag(client: Client, tagName: string, options?: Options.PageOption & Options.GallerySortOption & Options.WindowOption): Promise<APIResponse<TagResponse>>;
export declare function tagImage(client: Client, tagName: string, imageId: string): Promise<APIResponse<GalleryImageResponse>>;
export declare function itemTags(client: Client, itemId: string): Promise<APIResponse<TagVoteResponse[]>>;
export declare function tagVoting(client: Client, itemId: string, tagName: string, vote: 'up' | 'down'): Promise<APIResponse<boolean>>;
export declare function updateTags(client: Client, itemId: string, tags: string[]): Promise<APIResponse<boolean>>;
export declare type ImageType = 'jpg' | 'png' | 'gif' | 'anigif' | 'album';
export declare type ImageSize = 'small' | 'med' | 'big' | 'lrg' | 'huge';
export interface GallerySearchOptions {
    all?: string[];
    any?: string[];
    exactly?: string;
    not?: string[];
    type?: ImageType;
    size?: ImageSize;
}
export declare function search(client: Client, searchOptions: string | GallerySearchOptions, filterOptions?: Options.GallerySortOption & Options.WindowOption & Options.PageOption): Promise<APIResponse<BaseGalleryResponse[]>>;
export declare function random(client: Client, page?: number): Promise<APIResponse<BaseGalleryResponse[]>>;
export interface ShareOptions {
    topic?: string;
    bypassTerms?: boolean;
    mature?: boolean;
    tags?: string[];
}
export declare function share(client: Client, itemId: string, title: string, options?: ShareOptions): Promise<APIResponse<boolean>>;
export declare function remove(client: Client, imageId: string): Promise<APIResponse<boolean>>;
export declare function album(client: Client, albumId: string): Promise<APIResponse<GalleryAlbumResponse>>;
export declare function image(client: Client, imageId: string): Promise<APIResponse<BaseImageResponse>>;
export declare function report(client: Client, itemId: string, reason?: Options.ReportReasonEnum): Promise<APIResponse<boolean>>;
export declare function votes(client: Client, itemId: string): Promise<APIResponse<VoteResponse>>;
export declare function comments(client: Client, itemId: string, sort?: Options.GalleryCommentSort): Promise<APIResponse<CommentResponse[]>>;
export declare function comment(client: Client, itemId: string, commentId: string): Promise<APIResponse<CommentResponse>>;
export declare function commentCreate(client: Client, itemId: string, comment: string): Promise<APIResponse<boolean>>;
export declare function commentReply(client: Client, itemId: string, commentId: string, comment: string): Promise<APIResponse<boolean>>;
export declare function commentIds(client: Client, itemId: string): Promise<APIResponse<number[]>>;
export declare function commentCount(client: Client, itemId: string): Promise<APIResponse<number>>;

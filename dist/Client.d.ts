/// <reference types="node" />
import * as Options from './Options';
import * as AuthorizationTasks from './AuthorizationTasks';
import * as Gallery from './api/Gallery';
import * as Image from './api/Image';
export interface ClientConfig {
    client_id?: string;
    client_secret?: string;
    access_token?: string;
    refresh_token?: string;
    mashape_key?: string;
}
export default class  {
    client_id: string | null;
    client_secret: string | null;
    access_token: string | null;
    refresh_token: string | null;
    mashape_key: string | null;
    RateLimits: {
        client_limit: number | null;
        client_remaining: number | null;
        user_limit: number | null;
        user_remaining: number | null;
        user_reset?: Date | null;
        ip_limit: number | null;
        ip_remaining: number | null;
        ip_reset: Date | null;
    };
    constructor(config?: ClientConfig | string);
    toString(): string;
    Authorize: {
        regenerateFromRefreshToken: (refreshToken?: string | undefined) => Promise<RequestTokenResponse> | null;
        byPIN: (applicationState?: string | undefined) => AuthorizationTasks.TwoStageAuthReturn;
        byCode: (applicationState?: string | undefined) => AuthorizationTasks.TwoStageAuthReturn;
        byToken: (applicationState?: string | undefined) => {
            url: string;
            authorize: (url: string) => RequestTokenResponse;
        };
    };
    Account: {
        get: (username?: string | undefined) => Promise<APIResponse<AccountResponse>>;
        galleryFavorites: (username?: string | null | undefined, config?: (Options.PageOption & Options.AccountCommentSortOption) | undefined) => Promise<APIResponse<BaseGalleryResponse[]>>;
        favorites: (username?: string | null | undefined, options?: (Options.PageOption & Options.AccountCommentSortOption) | undefined) => Promise<APIResponse<BaseGalleryResponse[]>>;
        submissions: (username?: string | null | undefined, page?: number | undefined) => Promise<APIResponse<BaseGalleryResponse[]>>;
        settings: () => Promise<APIResponse<AccountResponse>>;
        changeSettings: (options: Options.ChangeAccountSettingsOptions) => Promise<APIResponse<boolean>>;
        galleryProfile: (username?: string | undefined) => Promise<APIResponse<GalleryProfileResponse>>;
        verifyEmail: (username?: string | undefined) => Promise<APIResponse<boolean>>;
        sendVerificationEmail: () => Promise<APIResponse<boolean>>;
        albums: (username?: string | null | undefined, page?: number | undefined) => Promise<APIResponse<AlbumResponse[]>>;
        album: (username: string | null, albumId: string) => Promise<APIResponse<AlbumResponse>>;
        albumIds: (username: string | null, page: number) => Promise<APIResponse<number[]>>;
        albumCount: (username?: string | undefined) => Promise<APIResponse<number>>;
        albumRemove: (username: string | null, albumId: string) => Promise<APIResponse<boolean>>;
        comments: (username: string | null, options?: (Options.AccountCommentSortOption & Options.PageOption) | undefined) => Promise<APIResponse<CommentResponse[]>>;
        comment: (username: string | null, commentId: string) => Promise<APIResponse<CommentResponse>>;
        commentIds: (username: string | null, options?: (Options.AccountCommentSortOption & Options.PageOption) | undefined) => Promise<APIResponse<number[]>>;
        commentCount: (username?: string | undefined) => Promise<APIResponse<number>>;
        commentRemove: (commentId: string) => Promise<APIResponse<boolean>>;
        images: (username?: string | null | undefined, page?: number | undefined) => Promise<APIResponse<ImageResponse[]>>;
        image: (username: string | null, imageId: string) => Promise<APIResponse<ImageResponse>>;
        imageIds: (username?: string | null | undefined, page?: number | undefined) => Promise<APIResponse<string[]>>;
        imageCount: (username?: string | undefined) => Promise<APIResponse<number>>;
        imageRemove: (username: string | null, deleteHash: string) => Promise<APIResponse<boolean>>;
        replies: () => Promise<APIResponse<NotificationResponse[]>>;
    };
    Album: {
        get: (id: string) => Promise<APIResponse<AlbumResponse>>;
        images: (id: string) => Promise<APIResponse<ImageResponse[]>>;
        image: (albumId: string, imageId: string) => Promise<APIResponse<ImageResponse[]>>;
        create: (options: Options.CreateAlbumOptions) => Promise<APIResponse<AlbumCreateResponse>>;
        update: (id: string, options: Options.CreateAlbumOptions) => Promise<APIResponse<AlbumCreateResponse>>;
        remote: (id: string) => Promise<APIResponse<AlbumCreateResponse>>;
        favorite: (id: string) => Promise<APIResponse<AlbumCreateResponse>>;
        setImages: (id: string, imageIds: string[] | null, deleteHashes?: string[] | undefined) => Promise<APIResponse<AlbumCreateResponse>>;
        addImages: (id: string, imageIds: string[] | null, deleteHashes?: string[] | undefined) => Promise<APIResponse<AlbumCreateResponse>>;
        removeImages: (id: string, imageIds: string[]) => Promise<APIResponse<AlbumCreateResponse>>;
    };
    Comment: {
        get: (commentId: string) => Promise<APIResponse<CommentResponse>>;
        create: (imageId: string, comment: string, parentId?: string | undefined) => Promise<APIResponse<boolean>>;
        remove: (commentId: string) => Promise<APIResponse<boolean>>;
        replies: (commentId: string) => Promise<APIResponse<CommentResponse[]>>;
        replyCreate: (commentId: string, imageId: string, comment: string) => Promise<APIResponse<boolean>>;
        vote: (commentId: string, vote: "up" | "down") => Promise<APIResponse<boolean>>;
        report: (commentId: string, reason?: Options.ReportReasonEnum | undefined) => Promise<APIResponse<boolean>>;
    };
    Conversation: {
        getAll: () => Promise<APIResponse<ConversationResponse[]>>;
        get: (conversationId: string, options?: (Options.PageOption & Options.OffsetOption) | undefined) => Promise<APIResponse<ConversationResponse>>;
    };
    Credits: {
        get: () => Promise<APIResponse<CreditsResponse>>;
    };
    CustomGallery: {
        get: (options?: (Options.PageOption & Options.GallerySortOption & Options.WindowOption) | undefined) => Promise<APIResponse<CustomGalleryResponse>>;
        image: (itemId: string) => Promise<APIResponse<BaseImageResponse>>;
        addTags: (tags: string[]) => Promise<APIResponse<boolean>>;
        removeTags: (tags: string[]) => Promise<APIResponse<boolean>>;
    };
    Gallery: {
        get: (options?: Options.GalleryGetOptions | undefined) => Promise<APIResponse<BaseGalleryResponse[]>>;
        memesGallery: (options?: (Options.GallerySortOption & Options.PageOption & Options.WindowOption) | undefined) => Promise<APIResponse<(BaseGalleryResponse & MemeResponse)[]>>;
        memesImage: (imageId: string) => Promise<APIResponse<BaseGalleryResponse & MemeResponse>>;
        subredditGalleries: (subreddit: string, options?: Options.SubredditGalleryOptions | undefined) => Promise<APIResponse<SubRedditGalleriesResponse[]>>;
        subredditImage: (subreddit: string, imageId: string) => Promise<APIResponse<SubRedditGalleriesResponse>>;
        tag: (tagName: string, options?: (Options.PageOption & Options.GallerySortOption & Options.WindowOption) | undefined) => Promise<APIResponse<TagResponse>>;
        tagImage: (tagName: string, imageId: string) => Promise<APIResponse<GalleryImageResponse>>;
        itemTags: (itemId: string) => Promise<APIResponse<TagVoteResponse[]>>;
        tagVoting: (itemId: string, tagName: string, vote: "up" | "down") => Promise<APIResponse<boolean>>;
        updateTags: (itemId: string, tags: string[]) => Promise<APIResponse<boolean>>;
        search: (searchOptions: string | Gallery.GallerySearchOptions, filterOptions: Options.GallerySortOption & Options.WindowOption & Options.PageOption) => Promise<APIResponse<BaseGalleryResponse[]>>;
        random: () => Promise<APIResponse<BaseGalleryResponse[]>>;
        share: (itemId: string, title: string, options?: Gallery.ShareOptions | undefined) => Promise<APIResponse<boolean>>;
        remove: (itemId: string) => Promise<APIResponse<boolean>>;
        album: (albumId: string) => Promise<APIResponse<GalleryAlbumResponse>>;
        image: (imageId: string) => Promise<APIResponse<GalleryImageResponse>>;
        report: (itemId: string, reason?: Options.ReportReasonEnum | undefined) => Promise<APIResponse<boolean>>;
        votes: (itemId: string) => Promise<APIResponse<VoteResponse>>;
        comments: (itemId: string, sort?: "top" | "best" | "new" | undefined) => Promise<APIResponse<CommentResponse[]>>;
        comment: (itemId: string, commentId: string) => Promise<APIResponse<CommentResponse>>;
        commentCreate: (itemId: string, comment: string) => Promise<APIResponse<boolean>>;
        commentReply: (itemId: string, commentId: string, comment: string) => Promise<APIResponse<boolean>>;
        commentIds: (itemId: string) => Promise<APIResponse<number[]>>;
        commentCount: (itemId: string) => Promise<APIResponse<number>>;
    };
    Image: {
        get: (imageId: string) => Promise<APIResponse<ImageResponse>>;
        upload: (image: string | Buffer, options?: Image.UploadOptions | undefined) => Promise<APIResponse<ImageResponse>>;
        remove: (imageId: string) => Promise<APIResponse<boolean>>;
        update: (imageId: string, options: Image.UpdateOptions) => Promise<APIResponse<boolean>>;
        favorite: (imageId: string) => Promise<APIResponse<boolean>>;
    };
    Memegen: {
        defaults: () => Promise<APIResponse<ImageResponse[]>>;
    };
    Notification: {
        getAll: (unreadOnly?: boolean | undefined) => Promise<APIResponse<NotificationsContainerResponse>>;
        get: (notificationId: string) => Promise<APIResponse<NotificationResponse>>;
        markAsRead: (notificationId: string) => Promise<APIResponse<boolean>>;
    };
    Topic: {
        defaults: () => Promise<APIResponse<TopicResponse[]>>;
        galleryTopics: (topicId: string, options?: (Options.GallerySortOption & Options.PageOption & Options.WindowOption) | undefined) => Promise<APIResponse<BaseGalleryResponse[]>>;
        topicItem: (topicId: string, itemId: string) => Promise<APIResponse<BaseGalleryResponse>>;
    };
}

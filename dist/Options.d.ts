export declare type GallerySort = 'viral' | 'top' | 'time';
export declare type GalleryCommentSort = 'best' | 'top' | 'new';
export declare type AccountCommentsSort = AccountFavoriteSort | 'best' | 'worst';
export declare type AccountFavoriteSort = 'oldest' | 'newest';
export declare type Window = 'day' | 'week' | 'month' | 'year' | 'all';
export declare type Section = 'hot' | 'top' | 'user';
export declare type AlbumPrivacy = 'public' | 'hidden' | 'secret';
export interface PageOption {
    page?: number;
}
export interface GallerySortOption {
    sort?: GallerySort;
}
export interface WindowOption {
    window?: Window;
}
export interface SectionOption {
    section: Section;
}
export interface OffsetOption {
    offset?: number;
}
export interface PageOption {
    page?: number;
}
export interface AccountCommentSortOption {
    sort?: AccountCommentsSort;
}
export interface AccountFavoriteSortOption {
    sort?: AccountFavoriteSortOption;
}
export interface ChangeAccountSettingsOptions {
    bio?: string;
    public_images?: boolean;
    messaging_enabled?: boolean;
    album_privacy?: AlbumPrivacy;
    accepted_gallery_terms?: boolean;
    username?: string;
    show_mature?: boolean;
    newsletter_subscribed?: boolean;
}
export interface CreateAlbumOptions {
    ids?: string[];
    deletehashes?: string[];
    title?: string;
    description?: string;
    privacy?: AlbumPrivacy;
    layout?: 'blog' | 'grid' | 'horizontal' | 'vertical';
    cover?: string;
}
export interface SubredditGalleryOptions extends PageOption, WindowOption {
    sort?: 'time' | 'top';
}
export interface GalleryGetOptions extends SectionOption, PageOption, WindowOption {
    sort?: GallerySort | 'rising';
    showViral?: boolean;
}
export declare enum ReportReasonEnum {
    DOES_NOT_BELONG = 1,
    SPAM = 2,
    ABUSIVE = 3,
    UNMARKED_MATURE = 4,
    PORN = 5,
}

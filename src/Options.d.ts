declare namespace Options {
  export type GallerySort = 'viral' | 'top' | 'time'
  export type GalleryCommentSort = 'best' | 'top' | 'new'
  export type AccountCommentsSort = AccountFavoriteSort | 'best' | 'worst'
  export type AccountFavoriteSort = 'oldest' | 'newest'
  export type Window = 'day' | 'week' | 'month' | 'year' | 'all'
  export type Section = 'hot' | 'top' | 'user'
  export type AlbumPrivacy = 'public' | 'hidden' | 'secret'

  export interface PageOption {
    page?: number
  }

  export interface GallerySortOption {
    sort?: GallerySort
  }

  export interface WindowOption {
    window?: Window
  }

  export interface SectionOption {
    section: Section
  }

  export interface OffsetOption {
    offset?: number
  }

  export interface PageOption {
    page?: number
  }

  export interface AccountCommentSortOption {
    sort?: AccountCommentsSort
  }

  export interface AccountFavoriteSortOption {
    sort?: AccountFavoriteSortOption
  }

  export interface ChangeAccountSettingsOptions {
    bio?: string,
    public_images?: boolean
    messaging_enabled?: boolean
    album_privacy? : Options.AlbumPrivacy
    accepted_gallery_terms?: boolean
    username?: string
    show_mature?: boolean
    newsletter_subscribed?: boolean
  }

  export interface SubredditGalleryOptions extends PageOption, WindowOption {
    sort?: 'time' | 'top'
  }

  export interface GalleryGetOptions extends Options.SectionOption, Options.PageOption, Options.WindowOption {
    sort?: GallerySort | 'rising'
    showViral?: boolean
  }
}


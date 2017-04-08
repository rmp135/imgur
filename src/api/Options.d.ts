declare namespace Options {
  export type GallerySort = 'viral' | 'top' | 'time'
  export type Window = 'day' | 'week' | 'month' | 'year' | 'all'
  export type Section = 'hot' | 'top' | 'user'
  export type CommentSort = 'best' | 'top' | 'new'

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

  export interface ImageIdOption {
    imageId: string
  }

  export interface OffsetOption {
    offset?: number
  }

}
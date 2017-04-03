declare enum ThumbnailSize {
  s,
  b,
  t,
  m,
  l,
  h
}

interface RequestTokenResponse {
  access_token: string
  expires_in: number
  token_type: string
  account_id: string,
  refresh_token: string
  account_username: string
}

interface CreditsResponse {
  UserLimit: number
  UserRemaining: number
  UserReset: number
  ClientLimit: number
  ClientRemaining: number
}

interface AccountResponse {
  id: number
  url: string
  bio: string
  reputation: string
  created: string
  pro_expiration: boolean | number
}

interface AccountSettingsResponse {
  account_url: string
  email: string
  high_quality: boolean
  public_images: boolean
  album_privacy: string
  pro_expiration: boolean | number
  accepted_gallery_terms: boolean
  active_emails: string[]
  messaging_enabled: boolean
  blocked_users: string[]
  show_mature: boolean
  first_party: boolean
}

interface AlbumResponse {
  id: string
  title: string
  description: string
  datetime: number
  cover: string
  cover_width: number
  cover_height: number
  account_url: string
  account_id: string
  privacy: string
  layout: string
  views: number
  link: string
  favorite: boolean
  nsfw: boolean
  section: string
  order: number
  deletehash: string
  images_count: number
  images: ImageResponse[]
  in_gallery: boolean
}

interface BaseImageResponse {
  id: string
  title: string
  description: string
  datetime: number
  type: string
  animated: boolean
  width: number
  height: number
  size: number
  views: number
  bandwidth: number
  deletehash: string
  link: string
  gifv: string
  mp4: string
  mp4_size: number
  looping: boolean
  vote: string
  favorite: boolean
  nfsw: boolean
}

interface ImageResponse extends BaseImageResponse {
  name: string
  section: string
  in_gallery: boolean
}

interface CommentResponse {
  id: number
  image_id: string
  comment: string
  author: string
  author_id: string
  on_album: number
  album_cover: string
  ups: number
  downs: number
  points: number
  datetime: number
  parent_id: number
  deleted: boolean
  vote: string
  children: CommentResponse[]
}

interface ConversationModel {
  id: number
  last_message_preview: string
  datetime: number
  with_account_id: number
  with_account: string
  message_count: number
  messages: MessageResponse[]
  done: boolean
  page: number
}

interface CustomGallery {
  account_url: string
  link: string
  tags: string[]
  item_count: number
  items: BaseGalleryResponse[]
}

interface BaseGalleryResponse {
  id: string
  title: string
  description: string
  datetime: number
  ups: number
  down: number
  points: number
  score: number
  comment_count: number
  is_album: boolean
  topic: string
  topic_id: number
  account_url: string
  account_id: number
}

interface GalleryAlbumResponse extends BaseGalleryResponse {
  cover: string
  cover_width: number
  cover_height: number
  account_url: string
  account_id: number
  privacy: string
  layout: string
  views: number
  link: string
  vote: string
  favorite: boolean
  nsfw: boolean
  images_count: number
  images: ImageResponse[]
}

interface GalleryImage extends ImageResponse, BaseGalleryResponse {
  section: string
}

interface TrophyProfileResponse {
  id: number
  name: string
  name_clean: string
  description: string
  data: string
  data_link: string
  datetime: number
  image: string
}

interface GalleryProfileResponse {
  total_gallery_comments: number
  total_gallery_favorites: number
  total_gallery_submissions: TrophyProfileResponse[]
}

interface MemeResponse {
  meme_name: string
  top_text: string
  bottom_text: string
  bg_image: string
}

interface MessageResponse {
  id: number
  from: string
  account_id: number
  sender_id: number
  body: string
  conversation_id: number
  datetime: number
}

interface NotificationResponse {
  id: number
  account_id: number
  viewed: boolean
  content: CommentResponse | ConversationModel
}

interface TagResponse {
  name: string
  followers: number
  total_items: number
  following?: boolean
  items: BaseGalleryResponse[]
}

interface TagVoteResponse {
  ups: number
  downs: number
  name: string
  author: string
}

interface TopicResponse {
  id: number
  name: string
  description: string
  css: string
  ephemeral: boolean
  topPost: BaseGalleryResponse
  heroImage: ImageResponse
  isHero: false
}

interface VoteResponse {
  ups: number
  down: number
}
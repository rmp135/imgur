declare module "*.json" {
    const value: any;
    export default value;
}

interface RequestTokenResponse {
  access_token: string
  expires_in: number
  token_type: string
  scope: null,
  account_id: string,
  refresh_token: string
  account_username: string
}

interface ClientConfig {
  client_id?: string
  client_secret?: string
  access_token?: string
  refresh_token?: string
}

interface ImageResponse {
  id: string
  title: string
  description: string
  datetime: number
  type: string
  animated: boolean
  width: number
  height: number
  size: number
}
# Account

[Imgur Documentation](https://api.imgur.com/endpoints/account)

If the username is ommitted, the currently signed in user will be used.

## get

Params:

- username?: string

## galleryFavorites

Params:

- username?: string

## accountSubmissions

Params:

- username?: string

## accountSettings

Only the currently authorized user can have their account settings retrieved.

## changeAccountSettings

Only the currently authorized user can have their account settings changed.

Params:

- 
    - bio?: string
    - public_images?: boolean
    - messaging_enabled?: boolean
    - album_privacy?: boolean
    - accepted_gallery_terms?: boolean
    - username?: string
    - show_mature?: boolean
    - newsletter_subscribed?: boolean
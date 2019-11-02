"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthorizationTasks = require("./AuthorizationTasks");
const Account = require("./api/Account");
const Album = require("./api/Album");
const Comment = require("./api/Comment");
const Conversation = require("./api/Conversation");
const Credits = require("./api/Credits");
const CustomGallery = require("./api/CustomGallery");
const Gallery = require("./api/Gallery");
const Image = require("./api/Image");
const Memegen = require("./api/Memegen");
const Notification = require("./api/Notification");
const Topic = require("./api/Topic");
class default_1 {
    constructor(config) {
        this.client_id = null;
        this.client_secret = null;
        this.access_token = null;
        this.refresh_token = null;
        this.mashape_key = null;
        this.RateLimits = {
            client_limit: null,
            client_remaining: null,
            user_limit: null,
            user_remaining: null,
            user_reset: null,
            ip_limit: null,
            ip_remaining: null,
            ip_reset: null
        };
        this.Authorize = {
            regenerateFromRefreshToken: (refreshToken) => {
                return AuthorizationTasks.regenerateFromRefreshToken(this, refreshToken);
            },
            byPIN: (applicationState) => {
                return AuthorizationTasks.twoStageAuth(this, 'pin', 'pin', applicationState);
            },
            byCode: (applicationState) => {
                const auth = AuthorizationTasks.twoStageAuth(this, 'authorization_code', 'code', applicationState);
                return {
                    url: auth.url,
                    authorize: (url) => auth.authorize(AuthorizationTasks.parseCodeURL(url))
                };
            },
            byToken: (applicationState) => {
                return {
                    url: AuthorizationTasks.generateTokenURL(this, applicationState),
                    authorize: (url) => {
                        const res = AuthorizationTasks.parseTokenURL(url);
                        this.access_token = res.access_token;
                        this.refresh_token = res.refresh_token;
                        return res;
                    }
                };
            }
        };
        this.Account = {
            get: (username) => Account.get(this, username),
            galleryFavorites: (username, config) => Account.galleryFavorites(this, username, config),
            favorites: (username, options) => Account.favorites(this, username, options),
            submissions: (username, page) => Account.submissions(this, username, page),
            settings: () => Account.settings(this),
            changeSettings: (options) => Account.changeSettings(this, options),
            galleryProfile: (username) => Account.galleryProfile(this, username),
            verifyEmail: (username) => Account.verifyEmail(this, username),
            sendVerificationEmail: () => Account.sendVerificationEmail(this),
            albums: (username, page) => Account.albums(this, username, page),
            album: (username, albumId) => Account.album(this, username, albumId),
            albumIds: (username, page) => Account.albumIds(this, username, page),
            albumCount: (username) => Account.albumCount(this, username),
            albumRemove: (username, albumId) => Account.albumRemove(this, username, albumId),
            comments: (username, options) => Account.comments(this, username, options),
            comment: (username, commentId) => Account.comment(this, username, commentId),
            commentIds: (username, options) => Account.commentIds(this, username, options),
            commentCount: (username) => Account.commentCount(this, username),
            commentRemove: (commentId) => Account.commentRemove(this, commentId),
            images: (username, page) => Account.images(this, username, page),
            image: (username, imageId) => Account.image(this, username, imageId),
            imageIds: (username, page) => Account.imageIds(this, username, page),
            imageCount: (username) => Account.imageCount(this, username),
            imageRemove: (username, deleteHash) => Account.imageRemove(this, username, deleteHash),
            replies: () => Account.replies(this)
        };
        this.Album = {
            get: (id) => Album.get(this, id),
            images: (id) => Album.images(this, id),
            image: (albumId, imageId) => Album.image(this, albumId, imageId),
            create: (options) => Album.create(this, options),
            update: (id, options) => Album.update(this, id, options),
            remote: (id) => Album.remove(this, id),
            favorite: (id) => Album.favorite(this, id),
            setImages: (id, imageIds, deleteHashes) => Album.setImages(this, id, imageIds, deleteHashes),
            addImages: (id, imageIds, deleteHashes) => Album.addImages(this, id, imageIds, deleteHashes),
            removeImages: (id, imageIds) => Album.removeImages(this, id, imageIds)
        };
        this.Comment = {
            get: (commentId) => Comment.get(this, commentId),
            create: (imageId, comment, parentId) => Comment.create(this, imageId, comment, parentId),
            remove: (commentId) => Comment.remove(this, commentId),
            replies: (commentId) => Comment.replies(this, commentId),
            replyCreate: (commentId, imageId, comment) => Comment.replyCreate(this, commentId, imageId, comment),
            vote: (commentId, vote) => Comment.vote(this, commentId, vote),
            report: (commentId, reason) => Comment.report(this, commentId)
        };
        this.Conversation = {
            getAll: () => Conversation.getAll(this),
            get: (conversationId, options) => Conversation.get(this, conversationId, options)
        };
        this.Credits = {
            get: () => Credits.get(this)
        };
        this.CustomGallery = {
            get: (options) => CustomGallery.get(this, options),
            image: (itemId) => CustomGallery.image(this, itemId),
            addTags: (tags) => CustomGallery.addTags(this, tags),
            removeTags: (tags) => CustomGallery.removeTage(this, tags)
        };
        this.Gallery = {
            get: (options) => Gallery.get(this, options),
            memesGallery: (options) => Gallery.memesGallery(this, options),
            memesImage: (imageId) => Gallery.memesImage(this, imageId),
            subredditGalleries: (subreddit, options) => Gallery.subredditGalleries(this, subreddit, options),
            subredditImage: (subreddit, imageId) => Gallery.subredditImage(this, subreddit, imageId),
            tag: (tagName, options) => Gallery.tag(this, tagName, options),
            tagImage: (tagName, imageId) => Gallery.tagImage(this, tagName, imageId),
            itemTags: (itemId) => Gallery.itemTags(this, itemId),
            tagVoting: (itemId, tagName, vote) => Gallery.tagVoting(this, itemId, tagName, vote),
            updateTags: (itemId, tags) => Gallery.updateTags(this, itemId, tags),
            search: (searchOptions, filterOptions) => Gallery.search(this, searchOptions, filterOptions),
            random: () => Gallery.random(this),
            share: (itemId, title, options) => Gallery.share(this, itemId, title, options),
            remove: (itemId) => Gallery.remove(this, itemId),
            album: (albumId) => Gallery.album(this, albumId),
            image: (imageId) => Gallery.image(this, imageId),
            report: (itemId, reason) => Gallery.report(this, itemId, reason),
            votes: (itemId) => Gallery.votes(this, itemId),
            comments: (itemId, sort) => Gallery.comments(this, itemId, sort),
            comment: (itemId, commentId) => Gallery.comment(this, itemId, commentId),
            commentCreate: (itemId, comment) => Gallery.commentCreate(this, itemId, comment),
            commentReply: (itemId, commentId, comment) => Gallery.commentReply(this, commentId, itemId, comment),
            commentIds: (itemId) => Gallery.commentIds(this, itemId),
            commentCount: (itemId) => Gallery.commentCount(this, itemId)
        };
        this.Image = {
            get: (imageId) => Image.get(this, imageId),
            upload: (image, options) => Image.upload(this, image, options),
            remove: (imageId) => Image.remove(this, imageId),
            update: (imageId, options) => Image.update(this, imageId, options),
            favorite: (imageId) => Image.favorite(this, imageId)
        };
        this.Memegen = {
            defaults: () => Memegen.defaults(this)
        };
        this.Notification = {
            getAll: (unreadOnly) => Notification.getAll(this, unreadOnly),
            get: (notificationId) => Notification.get(this, notificationId),
            markAsRead: (notificationId) => Notification.markAsRead(this, notificationId)
        };
        this.Topic = {
            defaults: () => Topic.defaults(this),
            galleryTopics: (topicId, options) => Topic.galleryTopics(this, topicId, options),
            topicItem: (topicId, itemId) => Topic.topicItem(this, topicId, itemId)
        };
        if (typeof config === 'string') {
            this.client_id = config;
        }
        else if (config != null) {
            this.client_id = config.client_id || null;
            this.client_secret = config.client_secret || null;
            this.refresh_token = config.refresh_token || null;
            this.access_token = config.access_token || null;
            this.mashape_key = config.mashape_key || null;
        }
    }
    toString() {
        return `Access Token: ${this.access_token}
Client ID: ${this.client_id}
Client Secret: ${this.client_secret}
Refresh Token: ${this.refresh_token}
Mashape Key: ${this.mashape_key}
--- Rate Limits
Client Limit: ${this.RateLimits.client_limit}
Client Remaining: ${this.RateLimits.client_remaining}
User Limit: ${this.RateLimits.user_limit}
User Remaining: ${this.RateLimits.user_remaining}
User Reset: ${this.RateLimits.user_reset}
IP Limit: ${this.RateLimits.ip_limit}
IP Remaining: ${this.RateLimits.ip_remaining}
IP Reset: ${this.RateLimits.ip_reset}
`;
    }
}
exports.default = default_1;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestTasks_1 = require("../RequestTasks");
function get(client, username) {
    const url = [
        'account',
        username || 'me',
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.get = get;
function galleryFavorites(client, username, options) {
    const defaultOptions = {
        username,
        page: null,
        sort: null
    };
    if (options != null) {
        Object.assign(defaultOptions, options);
    }
    const url = [
        'account',
        defaultOptions.username || 'me',
        'gallery_favorites',
        defaultOptions.page,
        defaultOptions.sort
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.galleryFavorites = galleryFavorites;
function favorites(client, username, options) {
    const defaultOptions = {
        username,
        page: null,
        sort: null
    };
    if (options != null) {
        defaultOptions.page = options.page;
        defaultOptions.sort = options.sort;
    }
    const url = [
        'account',
        defaultOptions.username || 'me',
        'favorites',
        defaultOptions.page,
        defaultOptions.sort
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.favorites = favorites;
function submissions(client, username, page) {
    const url = [
        'account',
        username || 'me',
        'submissions',
        page
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.submissions = submissions;
function settings(client) {
    const url = [
        'account',
        'me',
        'settings'
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.settings = settings;
function changeSettings(client, options) {
    const url = [
        'account',
        'me',
        'settings'
    ];
    const requestOptions = {
        method: 'put',
        data: options
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.changeSettings = changeSettings;
function galleryProfile(client, username) {
    const url = [
        'account',
        username || 'me',
        'gallery_profile'
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.galleryProfile = galleryProfile;
function verifyEmail(client, username) {
    const url = [
        'account',
        username || 'me',
        'verifyemail'
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.verifyEmail = verifyEmail;
function sendVerificationEmail(client) {
    const url = [
        'account',
        'me',
        'verifyemail'
    ];
    const requestOptions = {
        method: 'post'
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.sendVerificationEmail = sendVerificationEmail;
function albums(client, username, page) {
    const url = [
        'account',
        username || 'me',
        'albums',
        page
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.albums = albums;
function album(client, username, albumId) {
    const url = [
        'account',
        username || 'me',
        'album',
        albumId
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.album = album;
function albumIds(client, username, page) {
    const url = [
        'account',
        username || 'me',
        'albums',
        'ids',
        page
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.albumIds = albumIds;
function albumCount(client, username) {
    const url = [
        'account',
        username || 'me',
        'albums',
        'count'
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.albumCount = albumCount;
function albumRemove(client, username, albumId) {
    const url = [
        'account',
        username || 'me',
        'album',
        albumId
    ];
    const requestOptions = {
        method: 'delete'
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.albumRemove = albumRemove;
function comments(client, username, options) {
    const url = [
        'account',
        username || 'me',
        'comments'
    ];
    if (options != null) {
        url.push(options.sort, options.page);
    }
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.comments = comments;
function comment(client, username, commentId) {
    const url = [
        'account',
        username || 'me',
        'comment',
        commentId
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.comment = comment;
function commentIds(client, username, options) {
    const url = [
        'account',
        username || 'me',
        'comments',
        'ids'
    ];
    if (options != null) {
        url.push(options.sort, options.page);
    }
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.commentIds = commentIds;
function commentCount(client, username) {
    const url = [
        'account',
        username || 'me',
        'comments',
        'count'
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.commentCount = commentCount;
function commentRemove(client, commentId) {
    const url = [
        'account',
        'me',
        'comment',
        commentId
    ];
    const requestOptions = {
        method: 'delete'
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.commentRemove = commentRemove;
function images(client, username, page) {
    const url = [
        'account',
        username || 'me',
        'images',
        page
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.images = images;
function image(client, username, imageId) {
    const url = [
        'account',
        username || 'me',
        'image',
        imageId
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.image = image;
function imageIds(client, username, page) {
    const url = [
        'account',
        username || 'me',
        'images',
        'ids',
        page
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.imageIds = imageIds;
function imageCount(client, username) {
    const url = [
        'account',
        username || 'null'
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.imageCount = imageCount;
function imageRemove(client, username, deleteHash) {
    const url = [
        'account',
        username || 'me',
        'image',
        deleteHash
    ];
    const requestOptions = {
        method: 'delete'
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.imageRemove = imageRemove;
function replies(client) {
    const url = [
        'account',
        'me',
        'notifications',
        'replies'
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.replies = replies;

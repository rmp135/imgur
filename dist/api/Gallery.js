"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentCount = exports.commentIds = exports.commentReply = exports.commentCreate = exports.comment = exports.comments = exports.votes = exports.report = exports.image = exports.album = exports.remove = exports.share = exports.random = exports.search = exports.updateTags = exports.tagVoting = exports.itemTags = exports.tagImage = exports.tag = exports.subredditImage = exports.subredditGalleries = exports.memesImage = exports.memesGallery = exports.get = void 0;
const RequestTasks_1 = require("../RequestTasks");
function get(client, options) {
    const url = {
        path: [
            'gallery'
        ],
        params: {}
    };
    url.params = {};
    if (options != null) {
        url.path.push(options.section, options.sort, options.window, options.page);
        url.params.showViral = options.showViral;
    }
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.get = get;
function memesGallery(client, options) {
    const url = [
        'g',
        'memes',
    ];
    if (options != null) {
        url.push(options.sort, options.window, options.page);
    }
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.memesGallery = memesGallery;
function memesImage(client, imageId) {
    const url = [
        'g',
        'memes',
        imageId
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.memesImage = memesImage;
function subredditGalleries(client, subreddit, options) {
    const url = [
        'gallery',
        'r',
        subreddit
    ];
    if (options != null) {
        url.push(options.sort, options.window, options.page);
    }
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.subredditGalleries = subredditGalleries;
function subredditImage(client, subreddit, imageId) {
    const url = [
        'gallery',
        'r',
        subreddit,
        imageId
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.subredditImage = subredditImage;
function tag(client, tagName, options) {
    const url = [
        'gallery',
        't',
        tagName
    ];
    if (options != null) {
        url.push(options.sort, options.window, options.page);
    }
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.tag = tag;
function tagImage(client, tagName, imageId) {
    const url = [
        'gallery',
        't',
        tagName,
        imageId
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.tagImage = tagImage;
function itemTags(client, itemId) {
    const url = [
        'gallery',
        itemId,
        'tags'
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.itemTags = itemTags;
function tagVoting(client, itemId, tagName, vote) {
    const url = [
        'gallery',
        itemId,
        'vote',
        'tag',
        tagName,
        vote
    ];
    const requestOptions = {
        method: 'post'
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.tagVoting = tagVoting;
function updateTags(client, itemId, tags) {
    const url = [
        'gallery',
        'tags',
        itemId
    ];
    const requestOptions = {
        method: 'post',
        data: {
            tags: tags.join(',')
        }
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.updateTags = updateTags;
function search(client, searchOptions, filterOptions) {
    const path = [
        'gallery',
        'search'
    ];
    const params = {};
    if (filterOptions != null) {
        path.push(filterOptions.sort, filterOptions.window, filterOptions.page);
    }
    if (typeof searchOptions == 'string') {
        params.q = searchOptions;
    }
    else {
        params.q_all = searchOptions.all != null ? searchOptions.all.join(',') : undefined;
        params.q_any = searchOptions.any != null ? searchOptions.any.join(',') : undefined;
        params.q_exactly = searchOptions.exactly;
        params.q_not = searchOptions.not != null ? searchOptions.not.join(',') : undefined;
        params.q_size_px = searchOptions.size;
        params.q_type = searchOptions.type;
    }
    return RequestTasks_1.performAPIRequest(client, { path, params });
}
exports.search = search;
function random(client, page) {
    const url = [
        'gallery',
        'random',
        'random',
        page
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.random = random;
function share(client, itemId, title, options) {
    const path = [
        'gallery',
        itemId
    ];
    const requestOptions = {
        method: 'post',
        data: {
            title
        }
    };
    if (options != null) {
        requestOptions.data.topic = options.topic;
        requestOptions.data.terms = options.bypassTerms ? '1' : undefined;
        requestOptions.data.mature = options.mature ? '1' : undefined;
        requestOptions.data.tags = options.tags != null ? options.tags.join(',') : undefined;
    }
    return RequestTasks_1.performAPIRequest(client, path, requestOptions);
}
exports.share = share;
function remove(client, imageId) {
    const url = [
        'gallery',
        imageId
    ];
    const requestOptions = {
        method: 'delete'
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.remove = remove;
function album(client, albumId) {
    const url = [
        'gallery',
        'album',
        albumId
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.album = album;
function image(client, imageId) {
    const url = [
        'gallery',
        'image',
        imageId
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.image = image;
function report(client, itemId, reason) {
    const url = [
        'gallery',
        itemId,
        'report'
    ];
    const requestOptions = {
        method: 'post',
        data: {
            reason
        }
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.report = report;
function votes(client, itemId) {
    const url = [
        'gallery',
        itemId,
        'votes'
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.votes = votes;
function comments(client, itemId, sort) {
    const url = [
        'gallery',
        itemId,
        'comments',
        sort
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.comments = comments;
function comment(client, itemId, commentId) {
    const url = [
        'gallery',
        itemId,
        'comment',
        commentId
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.comment = comment;
function commentCreate(client, itemId, comment) {
    const url = [
        'gallery',
        itemId,
        'comment'
    ];
    const requestOptions = {
        method: 'post',
        data: {
            comment
        }
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.commentCreate = commentCreate;
function commentReply(client, itemId, commentId, comment) {
    const url = [
        'gallery',
        itemId,
        'comment',
        commentId
    ];
    const requestOptions = {
        method: 'post',
        data: {
            comment
        }
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.commentReply = commentReply;
function commentIds(client, itemId) {
    const url = [
        'gallery',
        itemId,
        'comments',
        'ids'
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.commentIds = commentIds;
function commentCount(client, itemId) {
    const url = [
        'gallery',
        itemId,
        'comments',
        'count'
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.commentCount = commentCount;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeImages = exports.addImages = exports.setImages = exports.favorite = exports.remove = exports.update = exports.create = exports.image = exports.images = exports.get = void 0;
const RequestTasks_1 = require("../RequestTasks");
function get(client, id) {
    const url = [
        'album',
        id,
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.get = get;
function images(client, id) {
    const url = [
        'album',
        id,
        'images'
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.images = images;
function image(client, albumId, imageId) {
    const url = [
        'album',
        albumId,
        'image',
        imageId
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.image = image;
function create(client, options) {
    const url = [
        'album'
    ];
    const requestOptions = {
        method: 'post',
        data: {
            title: options.title,
            description: options.description,
            privacy: options.privacy,
            layout: options.layout,
            cover: options.cover
        }
    };
    if (options.deletehashes != null) {
        requestOptions.data.deletehashes = options.deletehashes.join(',');
    }
    if (options.ids != null) {
        requestOptions.data.ids = options.ids.join(',');
    }
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.create = create;
function update(client, id, options) {
    const url = [
        'album',
        id
    ];
    const requestOptions = {
        method: 'post',
        data: {
            title: options.title,
            description: options.description,
            privacy: options.privacy,
            layout: options.layout,
            cover: options.cover
        }
    };
    if (options.deletehashes != null) {
        requestOptions.data.deletehashes = options.deletehashes.join(',');
    }
    if (options.ids != null) {
        requestOptions.data.ids = options.ids.join(',');
    }
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.update = update;
function remove(client, id) {
    const url = [
        'album',
        id
    ];
    const requestOptions = {
        method: 'delete'
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.remove = remove;
function favorite(client, id) {
    const url = [
        'album',
        id,
        'favorite'
    ];
    const requestOptions = {
        method: 'post'
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.favorite = favorite;
function setImages(client, id, imageIds, deleteHashes) {
    const url = [
        'album',
        id
    ];
    const requestOptions = {
        method: 'post',
        data: {}
    };
    if (deleteHashes != null) {
        requestOptions.data.deletehashes = deleteHashes.join(',');
    }
    if (imageIds != null) {
        requestOptions.data.ids = imageIds.join(',');
    }
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.setImages = setImages;
function addImages(client, id, imageIds, deleteHashes) {
    const url = [
        'album',
        id,
        'add'
    ];
    const requestOptions = {
        method: 'put',
        data: {}
    };
    if (deleteHashes != null) {
        requestOptions.data.deletehashes = deleteHashes.join(',');
    }
    if (imageIds != null) {
        requestOptions.data.ids = imageIds.join(',');
    }
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.addImages = addImages;
function removeImages(client, id, imageIds) {
    const url = [
        'album',
        id,
        'remove_images'
    ];
    const requestOptions = {
        method: 'delete',
        data: {
            ids: imageIds.join(',')
        }
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.removeImages = removeImages;

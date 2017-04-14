"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestTasks_1 = require("../RequestTasks");
function get(client, imageId) {
    const url = [
        'image',
        imageId,
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.get = get;
function upload(client, image, options) {
    const url = [
        'image'
    ];
    const config = {
        method: 'post'
    };
    config.data = {
        image,
        type: 'base64'
    };
    if (options != null) {
        config.data = Object.assign({}, config.data, options);
    }
    return RequestTasks_1.performAPIRequest(client, url, config);
}
exports.upload = upload;
function remove(client, id) {
    const url = [
        'image',
        id
    ];
    const requestConfig = {
        method: 'delete'
    };
    return RequestTasks_1.performAPIRequest(client, url, requestConfig);
}
exports.remove = remove;
function update(client, imageId, options) {
    const url = [
        'image',
        imageId
    ];
    const requestConfig = {
        method: 'post',
        data: {
            title: options.title,
            description: options.description
        }
    };
    return RequestTasks_1.performAPIRequest(client, url, requestConfig);
}
exports.update = update;
function favorite(client, imageId) {
    const url = [
        'image',
        imageId,
        'favorite'
    ];
    const requestOptions = {
        method: 'post'
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.favorite = favorite;

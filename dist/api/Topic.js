"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestTasks_1 = require("../RequestTasks");
function defaults(client) {
    const url = [
        'topics',
        'defaults'
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.defaults = defaults;
function galleryTopics(client, topicId, options) {
    const url = [
        'topics',
        topicId
    ];
    if (options != null) {
        url.push(options.sort, options.window, options.page);
    }
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.galleryTopics = galleryTopics;
function topicItem(client, topicId, itemId) {
    const url = [
        'topics',
        topicId,
        itemId
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.topicItem = topicItem;

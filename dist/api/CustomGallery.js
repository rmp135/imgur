"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTage = exports.addTags = exports.image = exports.get = void 0;
const RequestTasks_1 = require("../RequestTasks");
function get(client, options) {
    const url = [
        'custom'
    ];
    if (options != null) {
        url.push(options.sort, options.window, options.page);
    }
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.get = get;
function image(client, itemId) {
    const url = [
        'custom',
        itemId
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.image = image;
function addTags(client, tags) {
    const url = [
        'custom',
        'add_tags'
    ];
    const requestOptions = {
        method: 'put',
        data: {
            tags: tags.join(',')
        }
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.addTags = addTags;
function removeTage(client, tags) {
    const url = [
        'custom',
        'remove_tags'
    ];
    const requestOptions = {
        method: 'delete',
        data: {
            tags: tags.join(',')
        }
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.removeTage = removeTage;

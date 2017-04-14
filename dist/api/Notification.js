"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestTasks_1 = require("../RequestTasks");
function getAll(client, unreadOnly) {
    const path = [
        'notification'
    ];
    const params = {
        new: unreadOnly
    };
    return RequestTasks_1.performAPIRequest(client, { path, params });
}
exports.getAll = getAll;
function get(client, notificationId) {
    const url = [
        'notification',
        notificationId
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.get = get;
function markAsRead(client, notificationId) {
    const url = [
        'notification'
    ];
    const requestOptions = {
        method: 'post',
        data: {
            ids: typeof notificationId == 'string' ? notificationId : notificationId.join(',')
        }
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.markAsRead = markAsRead;

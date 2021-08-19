"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.getAll = void 0;
const RequestTasks_1 = require("../RequestTasks");
function getAll(client) {
    const url = [
        'conversations'
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.getAll = getAll;
function get(client, conversationId, options) {
    const url = [
        'conversation',
        conversationId
    ];
    if (options != null) {
        url.push(options.page, options.offset);
    }
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.get = get;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestTasks_1 = require("../RequestTasks");
function get(client, commentId) {
    const url = [
        'comment',
        commentId
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.get = get;
function create(client, imageId, comment, parentId) {
    const url = [
        'comment'
    ];
    const requestOptions = {
        method: 'post',
        data: {
            comment,
            image_id: imageId,
            parent_id: parentId
        }
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.create = create;
function remove(client, commentId) {
    const url = [
        'comment',
        commentId
    ];
    const requestOptions = {
        method: 'delete'
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.remove = remove;
function replies(client, commentId) {
    const url = [
        'comment',
        commentId,
        'replies'
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.replies = replies;
function replyCreate(client, commentId, imageId, comment) {
    const url = [
        'comment',
        commentId
    ];
    const requestOptions = {
        method: 'post',
        data: {
            comment,
            image_id: imageId
        }
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.replyCreate = replyCreate;
function vote(client, commentId, vote) {
    const url = [
        'comment',
        commentId,
        'vote',
        vote
    ];
    const requestOptions = {
        method: 'post'
    };
    return RequestTasks_1.performAPIRequest(client, url, requestOptions);
}
exports.vote = vote;
function report(client, commentId, reason) {
    const url = [
        'comment',
        commentId,
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

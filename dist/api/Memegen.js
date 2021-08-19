"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaults = void 0;
const RequestTasks_1 = require("../RequestTasks");
function defaults(client) {
    const url = [
        'memegen',
        'defaults'
    ];
    return RequestTasks_1.performAPIRequest(client, url);
}
exports.defaults = defaults;

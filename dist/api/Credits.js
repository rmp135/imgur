"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const RequestTasks_1 = require("../RequestTasks");
function get(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = [
            'credits'
        ];
        const res = yield RequestTasks_1.performAPIRequest(client, url);
        client.RateLimits.user_limit = res.data.UserLimit;
        client.RateLimits.user_remaining = res.data.UserRemaining;
        client.RateLimits.user_reset = new Date(Date.now() + res.data.UserReset);
        client.RateLimits.client_limit = res.data.ClientLimit;
        client.RateLimits.client_remaining = res.data.ClientRemaining;
        return res;
    });
}
exports.get = get;

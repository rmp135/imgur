"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const join = require("url-join");
const url = require("url");
const querystring = require("querystring");
const axios_1 = require("axios");
const API_BASE_PATH = 'https://api.imgur.com/3';
const MASHAPE_BASE_PATH = 'https://imgur-apiv3.p.mashape.com/3';
function performRequest(client, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = Object.assign({ validateStatus(status) {
                return status === 200;
            } }, config);
        if (process.env.NODE_ENV === 'development') {
            console.log(options);
        }
        try {
            const res = yield axios_1.default(options);
            client.RateLimits.client_limit = res.headers['x-ratelimit-clientlimit'] || client.RateLimits.client_limit;
            client.RateLimits.client_remaining = res.headers['x-ratelimit-clientremaining'] || client.RateLimits.client_remaining;
            client.RateLimits.user_limit = res.headers['x-ratelimit-userlimit'] || client.RateLimits.user_limit;
            client.RateLimits.user_remaining = res.headers['x-ratelimit-userremaining'] || client.RateLimits.user_remaining;
            client.RateLimits.user_reset = res.headers['x-ratelimit-userreset'] ? new Date(Date.now() + Number(res.headers['x-ratelimit-userreset'])) : client.RateLimits.user_reset;
            client.RateLimits.ip_limit = res.headers['x-post-rate-limit-limit'] || client.RateLimits.ip_limit;
            client.RateLimits.ip_remaining = res.headers['x-post-rate-limit-remaining'] || client.RateLimits.ip_remaining;
            client.RateLimits.ip_reset = res.headers['x-post-rate-limit-reset'] ? new Date(Date.now() + Number(res.headers['x-post-rate-limit-reset'] * 1000)) : client.RateLimits.ip_reset;
            return res.data;
        }
        catch (e) {
            throw {
                status: e.response.status,
                body: e.response.data
            };
        }
    });
}
exports.performRequest = performRequest;
function performAPIRequest(client, url, axiosConfig) {
    const apiBase = client.mashape_key != null ? MASHAPE_BASE_PATH : API_BASE_PATH;
    if (Array.isArray(url)) {
        url.unshift(apiBase);
    }
    else {
        url.path.unshift(apiBase);
    }
    const options = Object.assign({ url: joinURL(url), headers: {} }, axiosConfig);
    const bearer = client.access_token || client.client_id;
    if (bearer != null) {
        options.headers.Authorization = `Bearer ${bearer}`;
    }
    if (client.mashape_key != null) {
        options.headers['X-Mashape-Key'] = client.mashape_key;
    }
    return performRequest(client, options);
}
exports.performAPIRequest = performAPIRequest;
function joinURL(urlToJoin) {
    if (Array.isArray(urlToJoin)) {
        return join(...urlToJoin);
    }
    const query = querystring.stringify(urlToJoin.params);
    return url.format({ pathname: join(...urlToJoin.path), search: query });
}
exports.joinURL = joinURL;

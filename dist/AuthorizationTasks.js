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
const RequestTasks = require("./RequestTasks");
const querystring = require("querystring");
const URL = require("url");
const OATH_BASE_PATH = 'https://api.imgur.com/oauth2';
function regenerateFromRefreshToken(client, refreshToken) {
    const token = refreshToken || client.refresh_token;
    if (token == null) {
        console.error('Please provide a refresh token on the client or as an argument.');
        return null;
    }
    return generateAuthRequest(client, 'refresh_token', 'refresh_token')(token);
}
exports.regenerateFromRefreshToken = regenerateFromRefreshToken;
function generateAuthRequest(client, grantType, responseType) {
    return (responseValue) => __awaiter(this, void 0, void 0, function* () {
        const requestConfig = {
            data: {
                client_id: client.client_id,
                client_secret: client.client_secret,
                grant_type: grantType,
                [responseType]: responseValue
            },
            method: 'post',
            url: RequestTasks.joinURL([OATH_BASE_PATH, 'token'])
        };
        const res = yield RequestTasks.performRequest(client, requestConfig);
        client.access_token = res.access_token;
        client.refresh_token = res.refresh_token;
        return res;
    });
}
exports.generateAuthRequest = generateAuthRequest;
function twoStageAuth(client, grantType, responseType, applicationState) {
    const authorize = generateAuthRequest(client, grantType, responseType);
    let userURL = RequestTasks.joinURL({ path: [OATH_BASE_PATH, 'authorize'], params: { client_id: client.client_id, response_type: responseType, state: applicationState } });
    return { url: userURL, authorize };
}
exports.twoStageAuth = twoStageAuth;
function generateTokenURL(client, applicationState) {
    let userURL = RequestTasks.joinURL({ path: [OATH_BASE_PATH, 'authorize'], params: { client_id: client.client_id, response_type: 'token', state: applicationState } });
    return userURL;
}
exports.generateTokenURL = generateTokenURL;
function parseCodeURL(url) {
    const res = querystring.parse(URL.parse(url).query);
    return res.code;
}
exports.parseCodeURL = parseCodeURL;
function parseTokenURL(url) {
    const res = querystring.parse(URL.parse(url).hash);
    return {
        access_token: res['#access_token'],
        expires_in: Number(res.expires_in),
        token_type: res.token_type,
        account_id: res.account_id,
        refresh_token: res.refresh_token,
        account_username: res.account_username
    };
}
exports.parseTokenURL = parseTokenURL;

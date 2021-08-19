"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.parseTokenURL = exports.parseCodeURL = exports.generateTokenURL = exports.twoStageAuth = exports.generateAuthRequest = exports.regenerateFromRefreshToken = void 0;
const RequestTasks = __importStar(require("./RequestTasks"));
const url = __importStar(require("url"));
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
function parseCodeURL(urlToParse) {
    const res = new url.URL(urlToParse).searchParams;
    return res.get("code");
}
exports.parseCodeURL = parseCodeURL;
function parseTokenURL(urlToParse) {
    const res = new url.URLSearchParams(new url.URL(urlToParse).hash);
    return {
        access_token: res.get("#access_token"),
        expires_in: Number(res.get("expires_in")),
        token_type: res.get("token_type"),
        account_id: res.get("account_id"),
        refresh_token: res.get("refresh_token"),
        account_username: res.get("account_username")
    };
}
exports.parseTokenURL = parseTokenURL;

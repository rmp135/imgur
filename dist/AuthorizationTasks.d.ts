import Client from './Client';
export interface TwoStageAuthReturn {
    url: string;
    authorize: (input: string) => Promise<RequestTokenResponse>;
}
export declare function regenerateFromRefreshToken(client: Client, refreshToken?: string): Promise<RequestTokenResponse> | null;
export declare function generateAuthRequest(client: Client, grantType: string, responseType: string): (responseValue: string) => Promise<RequestTokenResponse>;
export declare function twoStageAuth(client: Client, grantType: string, responseType: string, applicationState?: string): TwoStageAuthReturn;
export declare function generateTokenURL(client: Client, applicationState?: string): string;
export declare function parseCodeURL(urlToParse: string): string;
export declare function parseTokenURL(urlToParse: string): RequestTokenResponse;

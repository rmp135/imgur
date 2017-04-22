import * as Options from '../Options';
import Client from '../Client';
export declare function get(client: Client, commentId: string): Promise<APIResponse<CommentResponse>>;
export declare function create(client: Client, imageId: string, comment: string, parentId?: string): Promise<APIResponse<boolean>>;
export declare function remove(client: Client, commentId: string): Promise<APIResponse<boolean>>;
export declare function replies(client: Client, commentId: string): Promise<APIResponse<CommentResponse[]>>;
export declare function replyCreate(client: Client, commentId: string, imageId: string, comment: string): Promise<APIResponse<boolean>>;
export declare function vote(client: Client, commentId: string, vote: 'up' | 'down'): Promise<APIResponse<boolean>>;
export declare function report(client: Client, commentId: string, reason?: Options.ReportReasonEnum): Promise<APIResponse<boolean>>;

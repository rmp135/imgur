import * as Options from '../Options';
import Client from '../Client';
export declare function getAll(client: Client): Promise<APIResponse<ConversationResponse[]>>;
export declare function get(client: Client, conversationId: string, options?: Options.PageOption & Options.OffsetOption): Promise<APIResponse<ConversationResponse>>;

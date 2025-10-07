import { WASocket } from '@whiskeysockets/baileys';
import { HiwlerOptions } from './types';
import { GroupManager } from './GroupManager';
export declare class HiwlerClient {
    private sock;
    private authManager;
    groupManager: GroupManager | undefined;
    private logger;
    private options;
    constructor(options: HiwlerOptions);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getSocket(): WASocket | undefined;
}

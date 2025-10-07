import { AuthenticationCreds } from '@whiskeysockets/baileys';
export declare class AuthManager {
    private sessionName;
    private authState;
    constructor(sessionName: string);
    getAuthState(): Promise<{
        state: {
            creds: AuthenticationCreds;
            keys: any;
        };
        saveCreds: () => Promise<void>;
    }>;
    saveState(): Promise<void>;
}

import { useMultiFileAuthState, AuthenticationCreds } from '@whiskeysockets/baileys';
import { join } from 'path';

export class AuthManager {
  private sessionName: string;
  private authState: { state: { creds: AuthenticationCreds; keys: any; }; saveCreds: () => Promise<void>; } | undefined;

  constructor(sessionName: string) {
    this.sessionName = sessionName;
    this.authState = undefined; // Initialize authState
  }

  public async getAuthState() {
    if (!this.authState) {
      const { state, saveCreds } = await useMultiFileAuthState(join(__dirname, `../auth_info_baileys/${this.sessionName}`));
      this.authState = { state, saveCreds };
    }
    return this.authState;
  }

  public async saveState() {
    if (this.authState) {
      await this.authState.saveCreds();
    }
  }
}


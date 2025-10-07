import makeWASocket, { ConnectionState, DisconnectReason, WASocket, fetchLatestBaileysVersion, useMultiFileAuthState } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import P from 'pino';
import { HiwlerOptions } from './types';
import { AuthManager } from './AuthManager';
import { GroupManager } from './GroupManager';

export class HiwlerClient {
  private sock: WASocket | undefined;
  private authManager: AuthManager;
  public groupManager: GroupManager | undefined;
  private logger: P.Logger;
  private options: HiwlerOptions;

  constructor(options: HiwlerOptions) {
    this.options = options;
    this.authManager = new AuthManager(options.sessionName);
    this.logger = P({ level: 'silent' }); // Set to 'info' or 'debug' for more logs
  }

  public async connect(): Promise<void> {
    const { state, saveCreds } = await this.authManager.getAuthState();
    const { version, isLatest } = await fetchLatestBaileysVersion();
    this.logger.info(`Using Baileys version ${version.join('.')}, isLatest: ${isLatest}`);

    this.sock = makeWASocket({
      version,
      logger: this.logger,
      printQRInTerminal: true,
      auth: state,
    });

    this.groupManager = new GroupManager(this.sock);

    this.sock.ev.on('connection.update', (update: Partial<ConnectionState>) => {
      const { connection, lastDisconnect } = update;
      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
        this.logger.error('Connection closed due + %s, reconnecting %s', lastDisconnect?.error, shouldReconnect);
        // reconnect if not logged out
        if (shouldReconnect) {
          this.connect();
        }
      } else if (connection === 'open') {
        this.logger.info('Opened connection');
      }
    });

  this.sock.ev.on('creds.update', saveCreds);

    // Add other event listeners as needed for messages, group updates, etc.
    // For example:
    // this.sock.ev.on('messages.upsert', async m => {
    //   console.log(JSON.stringify(m, undefined, 2))
    //   console.log('replying to', m.messages[0].key.remoteJid)
    //   await this.sock!.sendMessage(m.messages[0].key.remoteJid!, { text: 'Hello there!' })
    // })
  }

  public async disconnect(): Promise<void> {
    this.sock?.end(new Error('Disconnected by user'));
    this.logger.info('Disconnected from WhatsApp');
  }

  public getSocket(): WASocket | undefined {
    return this.sock;
  }
}


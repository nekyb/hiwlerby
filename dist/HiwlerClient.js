"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HiwlerClient = void 0;
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const pino_1 = __importDefault(require("pino"));
const AuthManager_1 = require("./AuthManager");
const GroupManager_1 = require("./GroupManager");
class HiwlerClient {
    sock;
    authManager;
    groupManager;
    logger;
    options;
    constructor(options) {
        this.options = options;
        this.authManager = new AuthManager_1.AuthManager(options.sessionName);
        this.logger = (0, pino_1.default)({ level: 'silent' }); // Set to 'info' or 'debug' for more logs
    }
    async connect() {
        const { state, saveCreds } = await this.authManager.getAuthState();
        const { version, isLatest } = await (0, baileys_1.fetchLatestBaileysVersion)();
        this.logger.info(`Using Baileys version ${version.join('.')}, isLatest: ${isLatest}`);
        this.sock = (0, baileys_1.default)({
            version,
            logger: this.logger,
            printQRInTerminal: true,
            auth: state,
        });
        this.groupManager = new GroupManager_1.GroupManager(this.sock);
        this.sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === 'close') {
                const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== baileys_1.DisconnectReason.loggedOut;
                this.logger.error('Connection closed due + %s, reconnecting %s', lastDisconnect?.error, shouldReconnect);
                // reconnect if not logged out
                if (shouldReconnect) {
                    this.connect();
                }
            }
            else if (connection === 'open') {
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
    async disconnect() {
        this.sock?.end(new Error('Disconnected by user'));
        this.logger.info('Disconnected from WhatsApp');
    }
    getSocket() {
        return this.sock;
    }
}
exports.HiwlerClient = HiwlerClient;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthManager = void 0;
const baileys_1 = require("@whiskeysockets/baileys");
const path_1 = require("path");
class AuthManager {
    sessionName;
    authState;
    constructor(sessionName) {
        this.sessionName = sessionName;
        this.authState = undefined; // Initialize authState
    }
    async getAuthState() {
        if (!this.authState) {
            const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)((0, path_1.join)(__dirname, `../auth_info_baileys/${this.sessionName}`));
            this.authState = { state, saveCreds };
        }
        return this.authState;
    }
    async saveState() {
        if (this.authState) {
            await this.authState.saveCreds();
        }
    }
}
exports.AuthManager = AuthManager;

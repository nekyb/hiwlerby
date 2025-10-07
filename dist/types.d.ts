import { GroupMetadata, GroupParticipant, GroupModificationResponse } from '@whiskeysockets/baileys';
export interface HiwlerOptions {
    sessionName: string;
}
export interface GroupAdminCommandResult {
    success: boolean;
    message: string;
    data?: any;
}
export { GroupMetadata, GroupParticipant, GroupModificationResponse };

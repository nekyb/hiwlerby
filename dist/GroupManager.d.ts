import { WASocket } from '@whiskeysockets/baileys';
import { GroupAdminCommandResult } from './types';
export declare class GroupManager {
    private sock;
    constructor(sock: WASocket);
    createGroup(name: string, participants: string[]): Promise<GroupAdminCommandResult>;
    addParticipants(groupId: string, participants: string[]): Promise<GroupAdminCommandResult>;
    removeParticipants(groupId: string, participants: string[]): Promise<GroupAdminCommandResult>;
    promoteParticipants(groupId: string, participants: string[]): Promise<GroupAdminCommandResult>;
    demoteParticipants(groupId: string, participants: string[]): Promise<GroupAdminCommandResult>;
    updateGroupSubject(groupId: string, subject: string): Promise<GroupAdminCommandResult>;
    updateGroupDescription(groupId: string, description: string): Promise<GroupAdminCommandResult>;
    getGroupMetadata(groupId: string): Promise<GroupAdminCommandResult>;
    getGroupParticipants(groupId: string): Promise<GroupAdminCommandResult>;
    getGroupInviteCode(groupId: string): Promise<GroupAdminCommandResult>;
    revokeGroupInviteCode(groupId: string): Promise<GroupAdminCommandResult>;
}

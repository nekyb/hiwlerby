"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupManager = void 0;
class GroupManager {
    sock;
    constructor(sock) {
        this.sock = sock;
    }
    async createGroup(name, participants) {
        try {
            const response = await this.sock.groupCreate(name, participants);
            return { success: true, message: 'Group created successfully', data: response };
        }
        catch (error) {
            return { success: false, message: `Failed to create group: ${error.message}` };
        }
    }
    async addParticipants(groupId, participants) {
        try {
            const response = await this.sock.groupParticipantsUpdate(groupId, participants, 'add');
            return { success: true, message: 'Participants added successfully', data: response };
        }
        catch (error) {
            return { success: false, message: `Failed to add participants: ${error.message}` };
        }
    }
    async removeParticipants(groupId, participants) {
        try {
            const response = await this.sock.groupParticipantsUpdate(groupId, participants, 'remove');
            return { success: true, message: 'Participants removed successfully', data: response };
        }
        catch (error) {
            return { success: false, message: `Failed to remove participants: ${error.message}` };
        }
    }
    async promoteParticipants(groupId, participants) {
        try {
            const response = await this.sock.groupParticipantsUpdate(groupId, participants, 'promote');
            return { success: true, message: 'Participants promoted successfully', data: response };
        }
        catch (error) {
            return { success: false, message: `Failed to promote participants: ${error.message}` };
        }
    }
    async demoteParticipants(groupId, participants) {
        try {
            const response = await this.sock.groupParticipantsUpdate(groupId, participants, 'demote');
            return { success: true, message: 'Participants demoted successfully', data: response };
        }
        catch (error) {
            return { success: false, message: `Failed to demote participants: ${error.message}` };
        }
    }
    async updateGroupSubject(groupId, subject) {
        try {
            await this.sock.groupUpdateSubject(groupId, subject);
            return { success: true, message: 'Group subject updated successfully' };
        }
        catch (error) {
            return { success: false, message: `Failed to update group subject: ${error.message}` };
        }
    }
    async updateGroupDescription(groupId, description) {
        try {
            await this.sock.groupUpdateDescription(groupId, description);
            return { success: true, message: 'Group description updated successfully' };
        }
        catch (error) {
            return { success: false, message: `Failed to update group description: ${error.message}` };
        }
    }
    async getGroupMetadata(groupId) {
        try {
            const metadata = await this.sock.groupMetadata(groupId);
            return { success: true, message: 'Group metadata retrieved successfully', data: metadata };
        }
        catch (error) {
            return { success: false, message: `Failed to retrieve group metadata: ${error.message}` };
        }
    }
    async getGroupParticipants(groupId) {
        try {
            const metadata = await this.sock.groupMetadata(groupId);
            return { success: true, message: 'Group participants retrieved successfully', data: metadata.participants };
        }
        catch (error) {
            return { success: false, message: `Failed to retrieve group participants: ${error.message}` };
        }
    }
    async getGroupInviteCode(groupId) {
        try {
            const inviteCode = await this.sock.groupInviteCode(groupId);
            return { success: true, message: 'Group invite code retrieved successfully', data: inviteCode };
        }
        catch (error) {
            return { success: false, message: `Failed to retrieve group invite code: ${error.message}` };
        }
    }
    async revokeGroupInviteCode(groupId) {
        try {
            const newInviteCode = await this.sock.groupRevokeInvite(groupId);
            return { success: true, message: 'Group invite code revoked successfully', data: newInviteCode };
        }
        catch (error) {
            return { success: false, message: `Failed to revoke group invite code: ${error.message}` };
        }
    }
}
exports.GroupManager = GroupManager;

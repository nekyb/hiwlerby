import { WASocket, GroupMetadata, GroupParticipant, GroupModificationResponse } from '@whiskeysockets/baileys';
import { GroupAdminCommandResult } from './types';

export class GroupManager {
  private sock: WASocket;

  constructor(sock: WASocket) {
    this.sock = sock;
  }

  public async createGroup(name: string, participants: string[]): Promise<GroupAdminCommandResult> {
    try {
      const response = await this.sock.groupCreate(name, participants);
      return { success: true, message: 'Group created successfully', data: response };
    } catch (error: any) {
      return { success: false, message: `Failed to create group: ${error.message}` };
    }
  }

  public async addParticipants(groupId: string, participants: string[]): Promise<GroupAdminCommandResult> {
    try {
      const response = await this.sock.groupParticipantsUpdate(groupId, participants, 'add');
      return { success: true, message: 'Participants added successfully', data: response };
    } catch (error: any) {
      return { success: false, message: `Failed to add participants: ${error.message}` };
    }
  }

  public async removeParticipants(groupId: string, participants: string[]): Promise<GroupAdminCommandResult> {
    try {
      const response = await this.sock.groupParticipantsUpdate(groupId, participants, 'remove');
      return { success: true, message: 'Participants removed successfully', data: response };
    } catch (error: any) {
      return { success: false, message: `Failed to remove participants: ${error.message}` };
    }
  }

  public async promoteParticipants(groupId: string, participants: string[]): Promise<GroupAdminCommandResult> {
    try {
      const response = await this.sock.groupParticipantsUpdate(groupId, participants, 'promote');
      return { success: true, message: 'Participants promoted successfully', data: response };
    } catch (error: any) {
      return { success: false, message: `Failed to promote participants: ${error.message}` };
    }
  }

  public async demoteParticipants(groupId: string, participants: string[]): Promise<GroupAdminCommandResult> {
    try {
      const response = await this.sock.groupParticipantsUpdate(groupId, participants, 'demote');
      return { success: true, message: 'Participants demoted successfully', data: response };
    } catch (error: any) {
      return { success: false, message: `Failed to demote participants: ${error.message}` };
    }
  }

  public async updateGroupSubject(groupId: string, subject: string): Promise<GroupAdminCommandResult> {
    try {
      await this.sock.groupUpdateSubject(groupId, subject);
      return { success: true, message: 'Group subject updated successfully' };
    } catch (error: any) {
      return { success: false, message: `Failed to update group subject: ${error.message}` };
    }
  }

  public async updateGroupDescription(groupId: string, description: string): Promise<GroupAdminCommandResult> {
    try {
      await this.sock.groupUpdateDescription(groupId, description);
      return { success: true, message: 'Group description updated successfully' };
    } catch (error: any) {
      return { success: false, message: `Failed to update group description: ${error.message}` };
    }
  }

  public async getGroupMetadata(groupId: string): Promise<GroupAdminCommandResult> {
    try {
      const metadata = await this.sock.groupMetadata(groupId);
      return { success: true, message: 'Group metadata retrieved successfully', data: metadata };
    } catch (error: any) {
      return { success: false, message: `Failed to retrieve group metadata: ${error.message}` };
    }
  }

  public async getGroupParticipants(groupId: string): Promise<GroupAdminCommandResult> {
    try {
      const metadata = await this.sock.groupMetadata(groupId);
      return { success: true, message: 'Group participants retrieved successfully', data: metadata.participants };
    } catch (error: any) {
      return { success: false, message: `Failed to retrieve group participants: ${error.message}` };
    }
  }

  public async getGroupInviteCode(groupId: string): Promise<GroupAdminCommandResult> {
    try {
      const inviteCode = await this.sock.groupInviteCode(groupId);
      return { success: true, message: 'Group invite code retrieved successfully', data: inviteCode };
    } catch (error: any) {
      return { success: false, message: `Failed to retrieve group invite code: ${error.message}` };
    }
  }

  public async revokeGroupInviteCode(groupId: string): Promise<GroupAdminCommandResult> {
    try {
      const newInviteCode = await this.sock.groupRevokeInvite(groupId);
      return { success: true, message: 'Group invite code revoked successfully', data: newInviteCode };
    } catch (error: any) {
      return { success: false, message: `Failed to revoke group invite code: ${error.message}` };
    }
  }
}


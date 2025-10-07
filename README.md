# Hiwlerby: Advanced Baileys Wrapper for WhatsApp Group Administration

## Introduction
Hiwlerby is a robust and easy-to-use TypeScript library designed to simplify WhatsApp group administration tasks using the Baileys library. It provides a high-level API that abstracts away the complexities of Baileys, offering comprehensive commands for managing groups and participants with enhanced type safety and developer experience.

## Features
-   **Simplified Baileys Integration**: Connects to WhatsApp via Baileys with minimal setup.
-   **Comprehensive Group Management**: Full suite of commands for creating, modifying, and querying groups.
-   **Participant Administration**: Easily add, remove, promote, and demote group participants.
-   **Type-Safe Development**: Built with TypeScript for improved code quality and maintainability.
-   **Robust Error Handling**: Provides clear and actionable error messages for failed operations.

## Installation
To install Hiwlerby in your project, use npm: 

```bash
npm install hiwlerby
```

**Prerequisites:**
-   Node.js version 17 or higher.

## Usage

### 1. Initialize the Hiwler Client

First, import `HiwlerClient` and create an instance. You need to provide a `sessionName` which will be used to store authentication credentials.

```typescript
import { HiwlerClient } from 'hiwlerby';

async function main() {
  const client = new HiwlerClient({
    sessionName: 'my-whatsapp-session' // A unique name for your session
  });

  await client.connect();
  console.log('Hiwler client connected to WhatsApp!');

  // Your group administration logic goes here

  // Disconnect when done (optional, client will try to reconnect on its own)
  // await client.disconnect();
}

main().catch(err => console.error('Error:', err));
```

### 2. Group Administration Commands

The `HiwlerClient` exposes a `groupManager` property, which contains all the group administration functionalities.

#### `createGroup(name: string, participants: string[]): Promise<GroupAdminCommandResult>`
Creates a new WhatsApp group with the specified name and initial participants.

```typescript
// Example: Create a new group
const newGroup = await client.groupManager?.createGroup('My Awesome Group', ['1234567890@s.whatsapp.net', '0987654321@s.whatsapp.net']);
if (newGroup?.success) {
  console.log('Group created:', newGroup.data);
} else {
  console.error('Failed to create group:', newGroup?.message);
}
```

#### `addParticipants(groupId: string, participants: string[]): Promise<GroupAdminCommandResult>`
Adds participants to an existing group.

```typescript
// Example: Add participants to a group
const addResult = await client.groupManager?.addParticipants('GROUP_ID@g.us', ['1122334455@s.whatsapp.net']);
if (addResult?.success) {
  console.log('Participants added:', addResult.data);
} else {
  console.error('Failed to add participants:', addResult?.message);
}
```

#### `removeParticipants(groupId: string, participants: string[]): Promise<GroupAdminCommandResult>`
Removes participants from an existing group.

```typescript
// Example: Remove participants from a group
const removeResult = await client.groupManager?.removeParticipants('GROUP_ID@g.us', ['1122334455@s.whatsapp.net']);
if (removeResult?.success) {
  console.log('Participants removed:', removeResult.data);
} else {
  console.error('Failed to remove participants:', removeResult?.message);
}
```

#### `promoteParticipants(groupId: string, participants: string[]): Promise<GroupAdminCommandResult>`
Promotes participants to group administrators.

```typescript
// Example: Promote participants to admin
const promoteResult = await client.groupManager?.promoteParticipants('GROUP_ID@g.us', ['1122334455@s.whatsapp.net']);
if (promoteResult?.success) {
  console.log('Participants promoted:', promoteResult.data);
} else {
  console.error('Failed to promote participants:', promoteResult?.message);
}
```

#### `demoteParticipants(groupId: string, participants: string[]): Promise<GroupAdminCommandResult>`
Demotes participants from group administrators to regular members.

```typescript
// Example: Demote participants from admin
const demoteResult = await client.groupManager?.demoteParticipants('GROUP_ID@g.us', ['1122334455@s.whatsapp.net']);
if (demoteResult?.success) {
  console.log('Participants demoted:', demoteResult.data);
} else {
  console.error('Failed to demote participants:', demoteResult?.message);
}
```

#### `updateGroupSubject(groupId: string, subject: string): Promise<GroupAdminCommandResult>`
Changes the subject (name) of a group.

```typescript
// Example: Update group subject
const subjectUpdateResult = await client.groupManager?.updateGroupSubject('GROUP_ID@g.us', 'New Group Subject');
if (subjectUpdateResult?.success) {
  console.log('Group subject updated.');
} else {
  console.error('Failed to update group subject:', subjectUpdateResult?.message);
}
```

#### `updateGroupDescription(groupId: string, description: string): Promise<GroupAdminCommandResult>`
Changes the description of a group.

```typescript
// Example: Update group description
const descUpdateResult = await client.groupManager?.updateGroupDescription('GROUP_ID@g.us', 'This is the new description for the group.');
if (descUpdateResult?.success) {
  console.log('Group description updated.');
} else {
  console.error('Failed to update group description:', descUpdateResult?.message);
}
```

#### `getGroupMetadata(groupId: string): Promise<GroupAdminCommandResult>`
Retrieves the metadata for a specific group.

```typescript
// Example: Get group metadata
const metadataResult = await client.groupManager?.getGroupMetadata('GROUP_ID@g.us');
if (metadataResult?.success) {
  console.log('Group metadata:', metadataResult.data);
} else {
  console.error('Failed to get group metadata:', metadataResult?.message);
}
```

#### `getGroupParticipants(groupId: string): Promise<GroupAdminCommandResult>`
Retrieves the list of participants for a specific group.

```typescript
// Example: Get group participants
const participantsResult = await client.groupManager?.getGroupParticipants('GROUP_ID@g.us');
if (participantsResult?.success) {
  console.log('Group participants:', participantsResult.data);
} else {
  console.error('Failed to get group participants:', participantsResult?.message);
}
```

#### `getGroupInviteCode(groupId: string): Promise<GroupAdminCommandResult>`
Retrieves the invite code for a specific group.

```typescript
// Example: Get group invite code
const inviteCodeResult = await client.groupManager?.getGroupInviteCode('GROUP_ID@g.us');
if (inviteCodeResult?.success) {
  console.log('Group invite code:', inviteCodeResult.data);
} else {
  console.error('Failed to get group invite code:', inviteCodeResult?.message);
}
```

#### `revokeGroupInviteCode(groupId: string): Promise<GroupAdminCommandResult>`
Revokes the current invite code for a group and generates a new one.

```typescript
// Example: Revoke group invite code
const revokeInviteResult = await client.groupManager?.revokeGroupInviteCode('GROUP_ID@g.us');
if (revokeInviteResult?.success) {
  console.log('New group invite code:', revokeInviteResult.data);
} else {
  console.error('Failed to revoke group invite code:', revokeInviteResult?.message);
}
```

## Contributing
Contributions are welcome! Please feel free to open issues or submit pull requests.

## License
This project is licensed under the ISC License. See the `LICENSE` file for details.


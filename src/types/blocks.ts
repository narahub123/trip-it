export interface BlockType {
  blockId: string | number;
  userId: any;
  blockedId: any;
  blockedUserNickname?: string;
  userNickname?: string;
  blockDate: string;
}

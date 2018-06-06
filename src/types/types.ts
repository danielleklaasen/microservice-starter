export interface IBlock {
  index: number;
  previousHash: string;
  hash: string;
  nonce: number;
  transactions: string[];
}

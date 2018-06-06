import { sha256 } from 'js-sha256';
import { IBlock } from '../types/types';
import logger from '../util/logger';
import { Block } from './block';

export class Blockchain {
  public blocks: IBlock[];
  constructor(genesisBlock) { // genesisBlock = first block
    this.blocks = [];
    this.addBlock(genesisBlock);
  }

  public addBlock(block) {
    if (this.blocks.length === 0) {
      block.previousHash = '0000000000000000'; // there is no previous hash
      block.hash = this.generateHash(block); // based on the block key it will generate a hash
    }

    this.blocks.push(block);
  }

  public getNextBlock(transactions) { // mining
    const block = new Block();

    transactions.forEach((transaction) => {
      block.addTransaction(transaction);
    });

    // serious perfomance issue here if blocks are big. ONLY REQUEST HASH
    const previousBlock = this.getPreviousBlock();

    block.index = this.blocks.length;
    block.previousHash = previousBlock.hash;
    block.hash = this.generateHash(block);

    return block;
  }

  public getPreviousBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  public generateHash(block) {
    let hash = sha256(block.key); // hashing the key

    // proof of work
    while (!hash.startsWith('000')) {
      // now you need computational power to find one.
      // in an actual blockchain you would work with maybe 15 0's
      block.nonce += 1;
      hash = sha256(block.key);
      logger.info(hash);
    }

    return hash;
  }
}

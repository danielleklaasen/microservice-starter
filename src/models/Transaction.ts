export class Transaction {
  public from: string;
  public to: string;
  public amount: number;

  constructor (from, to, amount) {
    this.from = from;
    this.to = to;
    this.amount = amount;
  }
}

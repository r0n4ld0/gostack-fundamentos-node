import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const sumIncomes = this.transactions.reduce((acc, cur) => {
      return cur.type === 'income' ? acc + cur.value : acc;
    }, 0);

    const sumOutcomes = this.transactions.reduce((acc, cur) => {
      return cur.type === 'outcome' ? acc + cur.value : acc;
    }, 0);

    const balance = {
      income: sumIncomes,
      outcome: sumOutcomes,
      total: sumIncomes - sumOutcomes,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;

  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account('snow-patrol');

console.log('Starting Balance:', myAccount.balance);

console.log('My first paycheque!');
const t1 = new Deposit(600.00, myAccount);
t1.commit();
console.log('Account Balance:', myAccount.balance);

console.log('Fancy dinner with the girlfriend')
const t2 = new Withdrawal(150.00, myAccount);
t2.commit();
console.log('Account Balance:', myAccount.balance);

console.log('Birthday Money!');
const t3 = new Deposit(1500.00, myAccount);
t3.commit();
console.log('Account Balance:', myAccount.balance);

console.log('New transmission for the car :(');
const t4 = new Withdrawal(1200.00, myAccount);
t4.commit();

console.log('Ending Balance:', myAccount.balance);

console.log('Account Transaction History:', myAccount.transactions);

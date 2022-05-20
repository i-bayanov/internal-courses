import newInstance from './newInstance';

function Test1(balance, isAdmin) {
  this.balance = balance;
  this.isAdmin = isAdmin;
}

Test1.prototype = {
  showBalance() { console.log(`Balance is: ${this.balance}`) },
}

function Test2(balance, isAdmin) {
  this.balance = balance;
  this.isAdmin = isAdmin;

  return { name: 'Ilia', surname: 'Bayanov' };
}

describe('NewInstance function', () => {
  test('should return the same object as the NEW operator', () => {
    expect(newInstance(Test1, [10, true])).toEqual(new Test1(10, true));
  });

  test('should return the return value of the constructor if its type is not primitive', () => {
    expect(newInstance(Test2, [10, true])).toEqual(new Test2(10, true));
  })
});

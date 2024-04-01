/** SOLID
 * SRP - Princípio da responsabilidade única
 * OCP - Princípio Aberto-Fechado
 * LSP - Princípio da substituição de Liskov
 * ISP - Princípio da Segregação da Interface
 * DIP - Princípio da inversão da dependência
 */

interface ICard {
  number: number;
  cvv: number;
  expiration: number;
}

interface IPaymentMethod {
  getDiscountAmount: (amount: number) => number;
}

class Card implements ICard {
  public number!: number;
  public cvv!: number;
  public expiration!: number;

  constructor(cvv: number, number: number, expiration: number) {
    this.cvv = cvv;
    this.number = number;
    this.expiration = expiration;
  }
}

class Billet implements IPaymentMethod {
  private discountInPercent: number = 0.05;

  public getDiscountAmount(amount: number) {
    return amount * this.discountInPercent;
  }
}

class Credit implements IPaymentMethod, ICard {
  private installments!: number;

  public number!: number;
  public cvv!: number;
  public expiration!: number;

  private oneInstallmentdiscountInPercent: number = 0.05;
  private fiveOrLessInstallmentdiscountInPercent: number = 0.02;
  private sixOrMoreInstallmentdiscountInPercent: number = 0;

  constructor(installments: number, card: ICard) {
    this.installments = installments;
    this.cvv = card.cvv;
    this.number = card.number;
    this.expiration = card.expiration;
  }

  public getDiscountAmount(amount: number) {
    if (this.installments === 1) {
      return amount * this.oneInstallmentdiscountInPercent;
    }

    if (this.installments < 6) {
      return amount * this.fiveOrLessInstallmentdiscountInPercent;
    }

    return amount * this.sixOrMoreInstallmentdiscountInPercent;
  }
}

class Debit implements IPaymentMethod, ICard {
  private discountInPercent: number = 0.01;

  public number!: number;
  public cvv!: number;
  public expiration!: number;

  constructor(card: ICard) {
    this.cvv = card.cvv;
    this.number = card.number;
    this.expiration = card.expiration;
  }

  public getDiscountAmount(amount: number) {
    return amount * this.discountInPercent;
  }
}

class CalculateOrderDiscount {
  private paymentMethod!: IPaymentMethod;

  constructor(paymentMethod: IPaymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  public execute(amount: number) {
    return this.paymentMethod.getDiscountAmount(amount);
  }
}

const calculateOrderDiscountBillet = new CalculateOrderDiscount(new Billet());

const calculateOrderDiscountCredit = new CalculateOrderDiscount(
  new Credit(10, new Card(123, 5500, 10))
);

const calculateOrderDiscountDebit = new CalculateOrderDiscount(
  new Debit(new Card(123, 5500, 10))
);

const billetDiscount = calculateOrderDiscountBillet.execute(100);
const creditDiscount = calculateOrderDiscountCredit.execute(100);
const debitDiscount = calculateOrderDiscountDebit.execute(100);

import { ATMState } from './Atm.interfaces';
import { ATMMachine } from './AtmMachine';

export class HasCard implements ATMState {
  private atmMachine: ATMMachine;

  public constructor(newATMMachine: ATMMachine) {
    this.atmMachine = newATMMachine;
  }

  public insertCard(): void {
    console.log('You can only insert one card at a time');
  }

  public ejectCard(): void {
    console.log('Your card is ejected');
    this.atmMachine.setATMState(this.atmMachine.getNoCardState());
  }

  public requestCash(cashToWithdraw: number): void {
    console.log('You have not entered your PIN');
  }

  public insertPin(pinEntered: number): void {
    if (pinEntered == 1234) {
      console.log('You entered the correct PIN');
      this.atmMachine.correctPinEntered = true;
      this.atmMachine.setATMState(this.atmMachine.getHasPin());
    } else {
      console.log('You entered the wrong PIN');
      this.atmMachine.correctPinEntered = false;
      console.log('Your card is ejected');
      this.atmMachine.setATMState(this.atmMachine.getNoCardState());
    }
  }
}

export class NoCard implements ATMState {
  private atmMachine: ATMMachine;

  public constructor(newATMMachine: ATMMachine) {
    this.atmMachine = newATMMachine;
  }

  public insertCard(): void {
    console.log('Please enter your pin');
    this.atmMachine.setATMState(this.atmMachine.getYesCardState());
  }

  public ejectCard(): void {
    console.log("You didn't enter a card");
  }

  public requestCash(cashToWithdraw: number): void {
    console.log('You have not entered your PIN');
  }

  public insertPin(pinEntered: number): void {
    console.log('You have not entered your card');
  }
}

export class HasPin implements ATMState {
  private atmMachine: ATMMachine;

  public constructor(newATMMachine: ATMMachine) {
    this.atmMachine = newATMMachine;
  }

  public insertCard(): void {
    console.log('You already entered a card');
  }

  public ejectCard(): void {
    console.log("You didn't enter a card");
    this.atmMachine.setATMState(this.atmMachine.getNoCardState());
  }

  public requestCash(cashToWithdraw: number): void {
    if (cashToWithdraw > this.atmMachine.cashInMachine) {
      console.log("You don't have that much cash available");
      console.log('Your card is ejected');
      this.atmMachine.setATMState(this.atmMachine.getNoCardState());
    } else {
      console.log(cashToWithdraw + ' is provided by the machine');
      this.atmMachine.setCashInMachine(this.atmMachine.cashInMachine - cashToWithdraw);

      console.log('Your card is ejected');
      this.atmMachine.setATMState(this.atmMachine.getNoCardState());

      if (this.atmMachine.cashInMachine <= 0) {
        this.atmMachine.setATMState(this.atmMachine.getNoCashState());
      }
    }
  }

  public insertPin(pinEntered: number): void {
      console.log('You already entered a PIN');
  }
}

export class NoCash implements ATMState {
  private atmMachine: ATMMachine;

  public constructor(newATMMachine: ATMMachine) {
    this.atmMachine = newATMMachine;
  }

  public insertCard(): void {
      console.log("We don't have any money");
      console.log("Your card is ejected");
  }

  public ejectCard(): void {
      console.log("We don't have any money");
      console.log("There is no card to eject");
  }

  public requestCash(cashToWithdraw: number): void {
      console.log("We don't have any money");
  }

  public insertPin(pinEntered: number): void {
    console.log("We don't have any money");
  }
}

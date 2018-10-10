import { ATMState, GetATMData } from './Atm.interfaces';
import { HasCard, NoCard, NoCash, HasPin } from './Card';

export class ATMMachine implements GetATMData {
    private hasCard: ATMState;
    private noCard: ATMState;
    private hasCorrectPin: ATMState;
    private atmOutOfMoney: ATMState;
    private atmState: ATMState;

    public cashInMachine: number = 2000;
    public correctPinEntered: boolean = false;

    constructor() {
        this.hasCard = new HasCard(this);
        this.noCard = new NoCard(this);
        this.hasCorrectPin = new HasPin(this);
        this.atmOutOfMoney = new NoCash(this);

        this.atmState = this.noCard;

        if (this.cashInMachine < 0) {
            this.atmState = this.atmOutOfMoney;
        }
    }
	
    setATMState(newATMState: ATMState): void {
        this.atmState = newATMState;
    }
	
	public setCashInMachine(newCashInMachine: number): void {
        this.cashInMachine = newCashInMachine;
    }
	
    public insertCard(): void {
        this.atmState.insertCard();
    }

    public ejectCard(): void {
        this.atmState.ejectCard();
    }

    public requestCash(cashToWithdraw: number): void {
        this.atmState.requestCash(cashToWithdraw);
    }

	public insertPin(pinEntered: number): void{
        this.atmState.insertPin(pinEntered);
    }
	
	public getYesCardState(): ATMState { 
        return this.hasCard; 
    }
    
    public getNoCardState(): ATMState { 
        return this.noCard; 
    }

	public getHasPin(): ATMState { 
        return this.hasCorrectPin;
    }

	public getNoCashState(): ATMState { 
        return this.atmOutOfMoney; 
    }
	
	public getATMState(): ATMState { 
        return this.atmState; 
    }
    
    public getCashInMachine(): number { 
        return this.cashInMachine;
    }
}

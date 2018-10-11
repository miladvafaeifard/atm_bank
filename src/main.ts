import { ATMMachine } from './AtmMachine';
import { GetATMData } from './Atm.interfaces';
import { ATMProxy } from './Proxy';

const atmMachine: ATMMachine = new ATMMachine();
atmMachine.insertCard();
atmMachine.ejectCard();
atmMachine.insertCard();
atmMachine.insertPin(1234);
atmMachine.requestCash(2000);
atmMachine.insertCard();
atmMachine.insertPin(1234);

// NEW STUFF : Proxy Design Pattern Code
// The interface limits access to just the methods you want
// made accessible

const atmProxy: GetATMData = new ATMProxy(atmMachine);

console.log("Current ATM State ", atmProxy.getATMState());
console.log("Cash in ATM Machine $" + atmProxy.getCashInMachine());

// The user can't perform this action because ATMProxy doesn't
// have access to that potentially harmful method
// atmProxy.setCashInMachine(10000);
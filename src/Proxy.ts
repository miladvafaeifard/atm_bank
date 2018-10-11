import { GetATMData, ATMState } from './Atm.interfaces';
import { ATMMachine } from './AtmMachine';

export class ATMProxy implements GetATMData {
         private realATMMachie: ATMMachine;

         constructor(atmMachine: ATMMachine) {
             this.realATMMachie = atmMachine;
         }

         public getATMState(): ATMState {
           return this.realATMMachie.getATMState();
         }

         public getCashInMachine(): number {
           return this.realATMMachie.getCashInMachine();
         }
       }

export interface ATMState {
    insertCard(): void;
    ejectCard(): void;
    insertPin(pinEntered: number): void;
    requestCash(cashToWithdraw: number): void;
}

export interface GetATMData {
    getATMState(): ATMState;
    getCashInMachine(): number;
}
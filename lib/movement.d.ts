/// <reference types="node" />
/**
 * Returns a reference to an interval
 * @param precision The duration of the interval in milliseonds
 * @param callback A function that is called on every cycle
 * @returns A reference to the interval
 */
export declare function movement(precision: number, callback: Function): NodeJS.Timer | number;
/**
 * Stops and destroys an interval
 * @param movement A reference to an interval
 */
export declare function stop(movement: any): void;

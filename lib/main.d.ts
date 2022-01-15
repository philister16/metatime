/// <reference types="node" />
import { stop } from "./movement";
interface MetatimeConfig {
    formatting?: 'cc.tt' | 'cktk' | 'cc' | 'bbbb';
    precision?: number;
}
/**
 * Creates a clock and streams the time in metatime formatting until stopped
 * @param callback Runs on every clock update and gets passed the current time as a string
 * @param options Configuration object
 * @returns A reference to a JS interval
 */
declare function clock(callback: Function, options?: MetatimeConfig): number | NodeJS.Timer;
/**
 * Returns the current time in metatime formatting as a string
 * @param options Configuration object
 * @returns A string representing the time in metatime formatting
 */
declare function now(options?: MetatimeConfig): string;
declare const Metatime: {
    clock: typeof clock;
    stop: typeof stop;
    now: typeof now;
};
export default Metatime;

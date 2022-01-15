/**
 * Describes the metatime spec where 1 day has 100 clicks and 1 click has 100 ticks
 * 100 clicks x 100 ticks = 10k blinks
 */
export interface MetatimeInterface {
    clicks: number;
    ticks: number;
    blinks: number;
}
/**
 * Takes a date and returns the milliseconds lapsed since UTC midnight
 * @param date The current date as a JS date object
 * @returns The time lapsed since UTC midnight in milliseconds
 */
export declare function getUTCTime(date: Date): number;
/**
 *
 * @param ms The number of milliseconds since UTC midnight
 * @returns Metatime object with clicks, ticks and blinks
 */
export declare function getMetatime(ms: number): MetatimeInterface;
/**
 * Returns a formatted timestring of the Metatime
 * @param time Metatime object
 * @param formatting A string to format the timestring, can be either 'cc.tt', 'cktk', 'cc' or 'bbbb'
 * @returns
 */
export declare function renderMetatime(time: MetatimeInterface, formatting: string): string;

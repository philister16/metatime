/**
 * Describes the metatime spec where 1 day has 100 clicks and 1 click has 100 ticks
 * 100 clicks x 100 ticks = 10k blinks
 */
export interface MetatimeInterface {
    clicks: number,
    ticks: number,
    totalTicks: number
}

/**
 * Takes a date and returns the milliseconds lapsed since UTC midnight
 * @param date The current date as a JS date object
 * @returns The time lapsed since UTC midnight in milliseconds
 */
export function getUTCTime(date: Date): number {
    const h = date.getUTCHours();
    const m = date.getUTCMinutes();
    const s = date.getUTCSeconds();
    const ms = date.getUTCMilliseconds();
    return h * 3600000 + m * 60000 + s * 1000 + ms;
}


/**
 * 
 * @param ms The number of milliseconds since UTC midnight
 * @returns Metatime object with clicks, ticks
 */
export function getMetatime(ms: number): MetatimeInterface {
    const spillover = ms % 8640;
    const totalTicks = (ms - spillover) / 8640;
    const clicks = Math.floor(totalTicks / 100);
    const ticks = totalTicks - clicks * 100;
    return { clicks, ticks, totalTicks };
}

/**
 * Returns a formatted timestring of the Metatime
 * @param time Metatime object
 * @param formatting A string to format the timestring, can be either 'cc.tt', 'cktk', 'cc' or 'bbbb'
 * @returns 
 */
export function renderMetatime(time: MetatimeInterface, formatting: string): string {
    let timestring: string;
    switch (formatting) {
        case 'cc.tt':
            timestring = `${time.clicks}.${time.ticks}`;
            break;
        case 'cxtx':
            timestring = `${time.clicks} ck. ${time.ticks} tk.`;
            break;
        case 'cc':
            timestring = `${time.clicks}`;
            break;
        case 'tttt':
            timestring = `${time.totalTicks}`;
            break;
        default:
            timestring = `${time.clicks}.${time.ticks}`;
    }
    return timestring;
}
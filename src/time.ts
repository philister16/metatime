/**
 * Describes the metatime spec where 1 day has 100 clicks and 1 click has 100 ticks
 * 100 clicks x 100 ticks = 10k blinks
 */
export interface MetatimeTime {
    days: number,
    clicks: number,
    ticks: number,
    blicks: number
}

/**
 * Takes a date and returns the milliseconds lapsed since UTC midnight
 * @param date The current date as a JS date object
 * @returns The time lapsed since UTC midnight in milliseconds
 */
function getUTCTime(date: Date): { days: number, ms: number } {
    const d = date.getUTCDate();
    const h = date.getUTCHours();
    const m = date.getUTCMinutes();
    const s = date.getUTCSeconds();
    const ms = date.getUTCMilliseconds();
    return {
        days: d,
        ms: h * 3600000 + m * 60000 + s * 1000 + ms
    };
}

/**
 * 
 * @param ms The number of milliseconds since UTC midnight
 * @returns Metatime object with clicks, ticks
 */
// export function getMetatime(date: Date): MetatimeTime {
//     const { day, ms } = getUTCTime(date);
//     const spillover = ms % 8640;
//     const totalTicks = (ms - spillover) / 8640;
//     const clicks = Math.floor(totalTicks / 100);
//     const ticks = totalTicks - clicks * 100;
//     return { day, clicks, ticks };
// }

/**
 * 
 * @param ms The number of milliseconds since UTC midnight
 * @returns Metatime object with clicks, ticks
 */
export function getMetatime(date: Date): MetatimeTime {
    const { days, ms } = getUTCTime(date);
    const spillover = ms % 86.4;
    const totalBlicks = (ms - spillover) / 86.4;
    let ticks = Math.floor(totalBlicks / 100);
    const blicks = Math.ceil(totalBlicks - ticks * 100);
    const clicks = Math.floor(ticks / 100);
    ticks = ticks - clicks * 100;
    return { days, clicks, ticks, blicks }
}
import { MetatimeTime } from "./time";

// Describes the styling options
export interface MetatimeFormatting {
    display?: string,
    style?: 'standard' | 'units' | 'bulky'
}

// Default styling
const defaultOptions = {
    display: 'cc.tt',
    style: 'standard'
};

/**
 * Splits the timestring into an array of segments
 * @param timestring A valid metatime timestring formatter as a string
 * @returns An array of strings representing the different time segments, i.e. clicks and ticks
 */
function getTimestringSegments(timestring: string): string[] {
    timestring = timestring.toLowerCase();
    return timestring.split('.');
}

/**
 * Pads a number to a fixed number of digits, i.e. 001 or 01 or 1
 * @param time The time number to be padded
 * @param digits The number of digits the time number should take
 * @returns A time number with a fixed number of digits
 */
function padTime(time: number, digits?: number): string {
    let paddedTime = '' + time;

    if (digits > 1 && digits <= 2) {
        let leadingZeros = '';
        for (let i = 0; i < digits; i++) {
            leadingZeros += '0';
        }
        paddedTime = leadingZeros + time;
        paddedTime = paddedTime.substring(paddedTime.length - digits);
    }
    return paddedTime;
}

/**
 * 
 * @param time the time as a MetatimeInterface
 * @param formatting An optional object with the formatting options.
 * @returns A formatted string showing the metatime
 */
export function render(time: MetatimeTime, formatting?: MetatimeFormatting): string {
    const finalFormatting = { ...defaultOptions, ...formatting }
    const { display, style } = finalFormatting;
    const segments = getTimestringSegments(display);
    let formattedSegments: string[] = [];

    segments.forEach(segment => {
        switch (segment[0]) {
            case 'd':
                formattedSegments = [
                    ...formattedSegments,
                    padTime(time.days, segment.length) +
                    (style === 'units' ? 'dx' : '')
                ]
                break;
            case 'c':
                formattedSegments = [
                    ...formattedSegments,
                    padTime(time.clicks, segment.length) +
                    (style === 'units' ? 'cx' : '')
                ]
                break;
            case 't':
                formattedSegments = [
                    ...formattedSegments,
                    padTime(time.ticks, segment.length) +
                    (style === 'units' ? 'tx' : '')
                ]
                break;
            case 'b':
                formattedSegments = [
                    ...formattedSegments,
                    padTime(time.blicks, segment.length) +
                    (style === 'units' ? 'bx' : '')
                ]
                break;
        }
    });

    const joint = style === 'units' ? ' ' : style === 'bulky' ? '' : '.';
    return formattedSegments.join(joint);
}
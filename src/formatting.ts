import { MetatimeConfig } from "./main";
import { MetatimeInterface } from "./time";

function getTimestringSegments(timestring: string): string[] {
    timestring = timestring.toLowerCase();
    return timestring.split('.');
}

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

export function renderMetatime(time: MetatimeInterface, config: MetatimeConfig) {
    const { formatting, style } = config;
    const segments = getTimestringSegments(formatting);
    let formattedSegments: string[] = [];

    segments.forEach(segment => {
        switch (segment[0]) {
            case 'd':
                formattedSegments = [
                    ...formattedSegments,
                    padTime(time.day, segment.length) +
                    (style === 'units' ? 'd' : '')
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
        }
    });

    const joint = style === 'units' ? ' ' : style === 'bulk' ? '' : '.';
    return formattedSegments.join(joint);
}
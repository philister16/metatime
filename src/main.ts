import { getMetatime } from "./time";
import { renderMetatime } from "./formatting";
import { movement, stop } from "./movement";

// Describes the configuration object
export interface MetatimeConfig {
    formatting?: string,
    precision?: number,
    style?: 'standard' | 'units' | 'bulk'
}

// Default config
const defaultOptions: MetatimeConfig = {
    formatting: 'cc.tt',
    precision: 1000,
    style: 'standard'
}

/**
 * Creates a clock and streams the time in metatime formatting until stopped
 * @param callback Runs on every clock update and gets passed the current time as a string
 * @param options Configuration object
 * @returns A reference to a JS interval
 */
function clock(callback: Function, options?: MetatimeConfig) {
    const config: MetatimeConfig = { ...defaultOptions, ...options };
    return movement(config.precision, () => {
        const mts = renderMetatime(getMetatime(new Date()), config);
        callback(mts);
    });
}

/**
 * Returns the current time in metatime formatting as a string
 * @param options Configuration object
 * @returns A string representing the time in metatime formatting
 */
function now(options?: MetatimeConfig) {
    const config: MetatimeConfig = { ...defaultOptions, ...options };
    return renderMetatime(getMetatime(new Date()), config);
}

const Metatime = {
    clock,
    stop,
    now
}

export default Metatime;
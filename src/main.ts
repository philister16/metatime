import { getUTCTime, getMetatime, renderMetatime } from "./time";
import { movement, stop } from "./movement";

// Describes the configuration object
interface MetatimeConfig {
    formatting?: 'cc.tt' | 'cktk' | 'cc' | 'bbbb',
    precision?: number
}

// Default config
const defaultOptions: MetatimeConfig = {
    formatting: 'cc.tt',
    precision: 1000
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
        const mts = renderMetatime(getMetatime(getUTCTime(new Date())), config.formatting);
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
    return renderMetatime(getMetatime(getUTCTime(new Date())), config.formatting);
}

const Metatime = {
    clock,
    stop,
    now
}

export default Metatime;
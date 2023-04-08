import { getMetatime, MetatimeTime } from "./time";
import { MetatimeFormatting, render } from "./formatting";
import { movement, stop } from "./movement";

// Describes the time object the user can interact with
interface MetatimeInterface {
    days: number,
    clicks: number,
    ticks: number,
    blicks: number,
    render: Function
}

// Describes the configuration object
interface MetatimeConfig {
    precision?: number,
}

// Default config
const defaultOptions: MetatimeConfig = {
    precision: 1000,
}

/**
 * Build the return object that the user can interact with
 * @param metatime An object of the type metatime interface
 * @returns A metatimetime type object for the user to interact with
 */
function createPublicAPI(metatime: MetatimeTime): MetatimeInterface {
    return {
        ...metatime,
        render: (formatting?: MetatimeFormatting) => render(metatime, formatting)
    }
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
        const metatime = getMetatime(new Date());
        callback(createPublicAPI(metatime));
    });
}

/**
 * Returns the current time in metatime formatting as a string
 * @param options Configuration object
 * @returns A string representing the time in metatime formatting
 */
function now(options?: MetatimeConfig): MetatimeInterface {
    // const config: MetatimeConfig = { ...defaultOptions, ...options };
    return createPublicAPI(getMetatime(new Date()));
}

const Metatime = {
    clock,
    stop,
    now
}

export default Metatime;
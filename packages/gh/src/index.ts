import {gh_options, gh_capture_context} from "./types";
import * as logger from './logger';
import * as provider from "./provider";
import * as enrichers from './enrichers';

export function wrap(handler: Function, options: gh_options = {}): (...args: any[]) => Promise<any> {
    init(options);
    const hn = provider.wrap(handler, options?.mode);
    enrichContext(options);
    return async function(...args2: any[]) {
        try {
            return await hn(...args2);
        } catch (e: any) {
            try {
                await provider.error(e, ...args2);
            } catch (e2: any) {
                if (options.silentError) {
                    await logger.error(
                        'Unable to process error via provider:',
                        JSON.stringify(e2, null, 4),
                        'original error was',
                        JSON.stringify(e, null, 4)
                    );
                }
            }
            if (!options.silentError) throw e;
        }
    }
}

export function init(options: gh_options) {
    try {
        logger.init(options);
    } catch (e: any) {
        throw new Error(`Unable to load gh logger '${options.logger || process.env.GH_LOGGER || 'console'}': ${e.message}`);
    }
    try {
        provider.init(options);
    } catch (e: any) {
        throw new Error(`Unable to load gh provider '${options.provider || process.env.GH_PROVIDER || 'console'}': ${e.message}`);
    }
}

// noinspection JSUnusedLocalSymbols
export function enrichContext(options: gh_options) {
    const cc = {};

    Object.values(enrichers).forEach(enricher => enricher(cc, options));

    if (Object.keys(cc).length) provider.addCaptureContext(cc);
}

export async function log(level: string, ...args: any[]) {
    return logger.log(level, ...args);
}

export async function error(...args: any[]) {
    return logger.error(...args);
}

export async function info(...args: any[]) {
    return logger.info(...args);
}

export async function warn(...args: any[]) {
    return logger.warn(...args);
}

export async function debug(...args: any[]) {
    return logger.debug(...args);
}

export function addCaptureContext(captureContext: gh_capture_context) {
    return provider.addCaptureContext(captureContext);
}

export async function captureError(e: Error, captureContext?: gh_capture_context, options?: any) {
    return provider.captureError(e, captureContext, options);
}

export async function captureMessage(message: string, captureContext?: gh_capture_context, options?: any) {
    return provider.captureMessage(message, captureContext, options);
}

export async function captureMessages(messages: string[], captureContext?: gh_capture_context, options?: any) {
    return provider.captureMessages(messages, captureContext, options);
}

export async function captureProperty(type: string, data?: any, captureContext?: gh_capture_context, options?: any) {
    return provider.captureProperty(type, data, captureContext, options);
}

export async function captureData(bulkData?: any, captureContext?: gh_capture_context, options?: any) {
    return provider.captureData(bulkData, captureContext, options);
}

export async function captureEvent(event: any, captureContext?: gh_capture_context, options?: any) {
    return provider.captureEvent(event, captureContext, options);
}

export async function captureTag(tag: string, value?: any, captureContext?: gh_capture_context, options?: any) {
    return provider.captureTag(tag, value, captureContext, options);
}

export async function captureTags(tags: any, captureContext?: gh_capture_context, options?: any) {
    return provider.captureTags(tags, captureContext, options);
}

export async function captureUser(user: any, captureContext?: gh_capture_context, options?: any) {
    return provider.captureUser(user, captureContext, options);
}

export default wrap;

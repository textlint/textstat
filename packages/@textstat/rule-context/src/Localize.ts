import template = require("lodash.template");
// template('hello {{ user }}!'
const TEMPLATE_INTERPOLATE = /{{([\s\S]+?)}}/g;
// TODO: add locale
export type LocaleTag = "en" | "cs" | "de" | "es" | "fr" | "it" | "ja" | "ko" | "pl" | "ru" | "tr" | "zh-CN" | "zh-TW";

type LocalizeMessageMulti = { [P in LocaleTag]?: string } & { en: string };

export type LocalizeMessages = {
    // must have "en"
    [index: string]: string | LocalizeMessageMulti;
};
/**
 * Default locale that is also fallback locale.
 */
const DEFAULT_LOCAL = "en";

export class Localize<T extends LocalizeMessages> {
    constructor(private messages: T, private locale: LocaleTag = DEFAULT_LOCAL) {}

    /**
     * Translate the `key` to text
     * If the `key` includes some variable, pass option and assign it to the variable.
     * @param key
     * @param options
     */
    t = (key: keyof T, options?: object) => {
        if (!this.messages[key]) {
            throw new Error(`key:${key} is missing in messages.`);
        }
        const message: LocalizeMessageMulti | string = this.messages[key];
        if (typeof message === "string") {
            return this.applyOption(message, options);
        }
        const localizedMessage = message[this.locale] || message[DEFAULT_LOCAL];
        if (!localizedMessage) {
            if (message[DEFAULT_LOCAL]) {
                throw new Error(`key:${key}.${this.locale} is missing in messages.`);
            }
            throw new Error(`key:${key}.${DEFAULT_LOCAL} should be defined in messages.`);
        }
        return this.applyOption(localizedMessage, options);
    };

    private applyOption = (message: string, options?: object): string => {
        if (!options) {
            return message;
        }
        return template(message, {
            interpolate: TEMPLATE_INTERPOLATE
        })(options);
    };
}

import template = require("lodash.template");
// template('hello {{ user }}!'
const TEMPLATE_INTERPOLATE = /{{([\s\S]+?)}}/g;
// TODO: add locale
export type Locale = "en" | "cs" | "de" | "es" | "fr" | "it" | "ja" | "ko" | "pl" | "ru" | "tr" | "zh-CN" | "zh-TW";

type LocalizeMessageMulti = { [P in Locale]?: string } & { en: string };

export interface LocalizeMessages {
    // must have "en"
    [index: string]: string | LocalizeMessageMulti;
}

export class Localize<T extends LocalizeMessages> {
    constructor(private messages: T, private locale: Locale = "en") {}

    t = (key: keyof T, options?: object) => {
        if (!this.messages[key]) {
            throw new Error(`key:${key} is missing in messages.`);
        }
        const message: LocalizeMessageMulti | string = this.messages[key];
        if (typeof message === "string") {
            return this.applyOption(message, options);
        }
        const localizedMessage = message[this.locale];
        if (!localizedMessage) {
            throw new Error(`key:${key}.${this.locale} is missing in messages.`);
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

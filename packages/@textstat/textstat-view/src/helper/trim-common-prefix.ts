const commonPathPrefix = require("common-path-prefix");
export const trimCommonPrefix = (items: string[]): string[] => {
    const prefix: string = commonPathPrefix(items);
    return items.map(item => item.replace(prefix, "").replace(/\/README.md$/, ""));
};

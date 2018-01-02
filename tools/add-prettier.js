#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const arg = process.argv[2];
const pkgPath = path.resolve(process.cwd(), arg);
const pkg = require(pkgPath);
const addPrettier = pkg => {
    const oldScripts = pkg.scripts || {};
    const scripts = Object.assign({}, oldScripts, {
        prettier: 'prettier --write "**/*.{js,jsx,ts,tsx,css}"'
    });
    const prettier = {
        singleQuote: false,
        printWidth: 120,
        tabWidth: 4
    };
    return Object.assign({}, pkg, {
        scripts,
        prettier
    });
};

const newPkg = addPrettier(pkg);
fs.writeFileSync(pkgPath, JSON.stringify(newPkg, null, 2), "utf-8");

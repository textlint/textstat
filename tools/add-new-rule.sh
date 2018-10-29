#!/bin/bash
# variable
declare scriptDir=$(cd $(dirname ${BASH_SOURCE:-$0}); pwd)
declare currentDir=$(pwd)
declare dirName=$(basename "${currentDir}")
declare currentDirName=$(basename "${currentDir}")

# dependecy script
# https://github.com/zeke/npe
if !type npe >/dev/null 2>&1; then
  npm install npe --global
fi
sh ${scriptDir}/node.js.sh

function echo_message(){
  echo "\033[31m=>\033[0m \033[036m$1\033[0m"
}
# Install
echo_message "npm install"
yarn add --dev --pure-lockfile \
typescript \
mocha \
@types/node \
@types/mocha \
cross-env \
ts-node

sh ${scriptDir}/add-prettier.sh

# Copy config
echo_message "Copy .tsconfig.json"
cp ${scriptDir}/resources/tsconfig.json ./
cp ${scriptDir}/resources/test.tsconfig.json ./test/tsconfig.json
cp ${scriptDir}/resources/typescript.mocha.opts ./test/mocha.opts
# Edit package.json
## Add script
echo_message "Add npm run-script"
npe scripts.build "cross-env NODE_ENV=production tsc --build"
npe scripts.watch "tsc --build --watch"
npe scripts.prepublish "npm run --if-present build"
npe scripts.test "mocha \"test/**/*.ts\""
npe main "lib/${currentDirName}/src/index.js"
npe types "lib/${currentDirName}/src/index.d.ts"
sort-package-json
# create README
rm README.md
pkg-to-readme --template "${scriptDir}/resources/textstat.readme.template" -o ./README.md
# git
git add .

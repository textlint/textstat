#!/bin/bash

declare scriptDir=$(cd $(dirname ${BASH_SOURCE:-$0}); pwd)
declare currentDir=$(pwd)

yarn add prettier --dev --pure-lockfile --prefer-offline
node "${scriptDir}/add-prettier.js" "${currentDir}/package.json"

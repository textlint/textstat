#!/usr/bin/env bash

declare scriptDir=$(cd $(dirname ${BASH_SOURCE:-$0}); pwd)
declare ruleName=$1
echo "Create ${ruleName}"

mkdir -p "${scriptDir}/../packages/@textstat/${ruleName}"
cd "${scriptDir}/../packages/@textstat/${ruleName}/"
NPM_SCOPE=@textstat bash "${scriptDir}/add-new-rule.sh"

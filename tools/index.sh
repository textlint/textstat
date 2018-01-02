#!/usr/bin/env bash

declare scriptDir=$(cd $(dirname ${BASH_SOURCE:-$0}); pwd)
declare ruleName=$2
echo "Create ${ruleName}"

mkdir "${scriptDir}/../packages/@textstat/${ruleName}"
cd "${scriptDir}/../packages/@textstat/${ruleName}"
sh add-new-rule.sh

#!/bin/bash

# https://github.com/simonwhitaker/gibo
if !type gibo >/dev/null 2>&1; then
  brew install gibo
fi
if !type licgen >/dev/null 2>&1; then
  gem install license-generator
fi
if !type init-package-json >/dev/null 2>&1; then
  npm install init-package-json --global
fi
if !type pkg-to-readme >/dev/null 2>&1; then
  npm install pkg-to-readme --global
fi

function echo_message(){
  echo "\033[31m=>\033[0m \033[036m$1\033[0m"
}

# http://stackoverflow.com/questions/2180270/check-if-current-directory-is-a-git-repository
declare insideGitRepo="$(git rev-parse --is-inside-work-tree 2>/dev/null)"
declare scriptDir=$(cd $(dirname ${BASH_SOURCE:-$0}); pwd)
declare currentDir=$(pwd)
declare currentDirName=$(basename "$(pwd)")
if [ "$insideGitRepo" ]; then
  declare branchName=$(git rev-parse --abbrev-ref HEAD)
  declare relativePathFromRoot=$(git rev-parse --show-prefix)
  # 必須な変数
  declare rootDir=$(git rev-parse --show-toplevel)
  declare rootDirName=$(basename "${rootDir}")
  declare parentDirName=$(basename $(dirname "${rootDir}"))
  declare repo="${parentDirName}/${rootDirName}"
  # github.com/repo/tree/branch/path
  declare homepage="${parentDirName}/${rootDirName}/tree/master/${relativePathFromRoot}"
else
  # 必須な変数
  declare rootDir=currentDir
  declare rootDirName=$(basename "${currentDir}")
  declare parentDirName=$(basename $(dirname "${currentDir}"))
  # user/name
  declare repo="${parentDirName}/${rootDirName}"
  # homepage - monorepoだと異なるので別変数
  declare homepage="${parentDirName}/${rootDirName}"
fi

if [ "$insideGitRepo" ]; then
  echo_message "Already exist .git - monorepo mode"
else
  echo_message "Create .git"
  # init
  git init
  gibo Node JetBrains >> .gitignore
  echo "/lib" >> .gitignore
  # Travis CI
  cp ${scriptDir}/resources/node.travis.yml ./.travis.yml
fi
# License
licgen MIT azu
# create dir
mkdir test
mkdir lib
mkdir src
# create package.json
cp ${scriptDir}/resources/package.json ./package.json

echo "SCOPE: ${NPM_SCOPE}"
if [[ -z "${NPM_SCOPE}" ]]; then
  npm init
else
  npm init --scope="${NPM_SCOPE}"
fi
# main entry
echo_message "Modify main entry point"
npe repository.type "git"
npe repository.url "https://github.com/${repo}.git"
npe bugs.url "https://github.com/${repo}/issues"
npe homepage "https://github.com/${homepage}"
npe files "src/, lib/, bin/"
npe main "lib/${currentDirName}.js"
sort-package-json
# git
git add .

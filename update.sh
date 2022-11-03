#!/bin/sh
param1=$1;

rm -rf _webtoolkit;
git clone https://github.com/domenicomonaco/gdpr-commons-web-toolkit.git _web_toolkit
rm -rf _web_toolkit/.git
git add . ;
git commit -m "update $param1";
git fetch;
git pull;
git push --force;

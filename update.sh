#!/bin/sh
param1=$1;

rm -rf _webtoolkit;
git clone https://github.com/domenicomonaco/gdpr-commons-web-toolkit.git _webt_oolkit
git add . ; 
git commit -m $param1; 
git fetch;
git pull;
git push;

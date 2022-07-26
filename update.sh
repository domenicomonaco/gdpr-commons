#!/bin/sh
param1=$1;

git submodule foreach update --init
git submodule foreach update --force;
git submodule foreach git pull --force; 
git add . ; 
git commit -m $param1; 
git fetch;
git pull;
git push;

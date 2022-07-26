#!/bin/bash
param1=$1

git add .
git commit -m $param1
git fetch
git push
git pull
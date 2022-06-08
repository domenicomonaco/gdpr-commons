#!/usr/bin/env sh
# abort on errors
set -e
# echo 'www.example.com' > CNAME

git checkout gh-pages;
git read-tree origin:docs
git commit -m'gh-pages documentation';
git push origin gh-pages;
git checkout master;
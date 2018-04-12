#!/bin/bash

git pull
yarn install
npm run build
export NODE_ENV=production
pm2 restart weekly

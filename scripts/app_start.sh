#!/usr/bin/env bash

cd /home/ubuntu/app

pm2 start index.js --name forWomen-backend
sudo systemctl restart nginx
#!/usr/bin/env bash

pm2 stop forWomen-backend || echo "stopped"
pm2 delete forWomen-backend  || echo "removed"
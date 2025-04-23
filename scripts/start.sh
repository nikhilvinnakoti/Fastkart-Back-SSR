#!/bin/bash
cd /home/ec2-user/fastkart/backend
pm2 start server.js --name fastkart-backend || pm2 restart fastkart-backend

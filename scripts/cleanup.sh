#!/bin/bash

echo "Cleaning up old backend files..."

chmod -R u+rwX /home/ec2-user/fastkart/backend
rm -rf /home/ec2-user/fastkart/backend/*

echo "Backend cleanup completed."
exit 0

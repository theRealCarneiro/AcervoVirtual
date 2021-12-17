#!/bin/sh
ssh-keygen -t rsa -b 4096 -m PEM -f ./jwt.key
openssl rsa -in keys/jwt.key -pubout -outform PEM -out ./jwt.key.pub


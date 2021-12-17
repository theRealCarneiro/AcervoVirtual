#!/bin/sh
mkdir keys
ssh-keygen -t rsa -b 4096 -m PEM -f keys/jwt.key
openssl rsa -in keys/jwt.key -pubout -outform PEM -out keys/jwt.key.pub


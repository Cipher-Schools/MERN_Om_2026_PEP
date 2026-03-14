#!/bin/bash

echo "Server names:"

jq -r '.server[].name' server.json

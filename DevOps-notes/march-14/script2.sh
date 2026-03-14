#!/bin/bash

echo "Running servers:"

jq -r '.server[] | select(.status=="running") | .name' server.json

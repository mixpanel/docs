#!/bin/bash

set -e

SRC_DIRS="components legacy pages redirects"
BAD_CONTENT=("/project/3/" "/report/3/")

for TERM in ${BAD_CONTENT[@]}; do
    echo "Checking for disallowed content: $TERM"
    if grep -r $TERM $SRC_DIRS
    then
        echo
        echo "✘✘ Disallowed content found: $TERM"
        exit 1
    fi
done

echo
echo "✔✔ All clear"

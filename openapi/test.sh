#!/bin/bash

set -e

npm run api:lint

git diff -p --exit-code HEAD || (echo "✘✘ git workspace is dirty; clean before running api:test" && exit 1)
npm run api:build
git diff -p --exit-code HEAD || (echo "✘✘ OpenAPI spec is not up to date. Please run 'npm run api:build' and commit the changes." && exit 1)

echo "✔✔ All clean"

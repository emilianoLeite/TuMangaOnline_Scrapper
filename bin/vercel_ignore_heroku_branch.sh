#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "heroku" ]] ; then
  # Don't build
  echo "🛑 - Actual branch is 'heroku'. Build cancelled"
  exit 0;
else
  # Proceed with the build
  exit 1;
fi

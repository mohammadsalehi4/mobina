#!/bin/sh
export NODE_OPTIONS="--max-old-space-size=8192"
npm run build
npm run preview
exec "$@"

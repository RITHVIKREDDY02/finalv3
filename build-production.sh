#!/bin/bash

# Production build script for VPS deployment
echo "Building production bundle..."

# Build the application
npm run build

# Copy production package.json to dist
cp package-production.json dist/package.json

# Install production dependencies in dist directory
cd dist
npm install --production

echo "Production build complete!"
echo "Files ready for deployment in dist/ directory"
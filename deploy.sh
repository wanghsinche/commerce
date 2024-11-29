#!/bin/bash

# Read .env and convert to JSON format
echo "{" > env.json
while IFS='=' read -r key value; do
    # Skip empty lines and comments
    [[ -z "$key" || "$key" =~ ^[[:space:]]*# ]] && continue
    
    # Remove quotes if present
    value="${value%\"}"
    value="${value#\"}"
    
    # Add quotes around value and escape special characters
    value=$(echo "$value" | sed 's/\\/\\\\/g; s/"/\\"/g')
    
    # Write key-value pair to JSON
    echo "  \"$key\": \"$value\"," >> env.json
done < .env

# Remove trailing comma and close JSON object
sed -i '$ s/,$//' env.json
echo "}" >> env.json

# load env variables from .env file
set -o allexport; source .env; set +o allexport
pnpx wrangler whoami
# set env bluk to wrangler
pnpx wrangler pages secret bulk < env.json

rm env.json

pnpm clouldflare:deploy

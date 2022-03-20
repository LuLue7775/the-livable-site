

#=======================================
# # Install dependencies only when needed
#=======================================

#Creates a layer from node:alpine image.
FROM node:14.18.1-alpine3.13 AS deps

RUN apk add --no-cache libc6-compat

#Sets an environment variable
ENV PORT 3000

#Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD commands
WORKDIR /app

#Copy new files or directories into the filesystem of the container
COPY package.json /app
COPY package-lock.json /app

#Execute commands in a new layer on top of the current image and commit the results
RUN npm install

##Copy new files or directories into the filesystem of the container
COPY . /app

#=======================================
# # Rebuild the source code only when needed
#=======================================

FROM node:14.18.1-alpine3.13 AS builder

WORKDIR /app

COPY . .

COPY --from=deps /app/node_modules ./node_modules

#Execute commands in a new layer on top of the current image and commit the results
RUN npm run build

#=======================================
# # Production image, copy all the files and run next
#=======================================

FROM node:14.18.1-alpine3.13 AS runner

WORKDIR /app

ENV NODE_ENV production

# Without using root user
## RUN addgroup -g 1001 -S nodejs
## RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./next.config.js 
COPY --from=builder /app/public ./public
## COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

## USER nextjs
#Informs container runtime that the container listens on the specified network ports at runtime
EXPOSE 3000

# Production mode
# CMD ["npm", "start"]
CMD ["node_modules/.bin/next", "start"]

# This for dev mode
# CMD ["npm", "run", "dev"]
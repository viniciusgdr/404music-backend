# Node version
FROM node:18.17.1-alpine as build

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY . /app

# Install all the dependencies
RUN npm install

RUN npx prisma generate

# Production image, copy all the files and run next
FROM node:18.17.1-alpine AS runner

WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs-service -u 1001

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.env ./.env
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/src ./src

USER root

CMD ["npm", "run", "start"]

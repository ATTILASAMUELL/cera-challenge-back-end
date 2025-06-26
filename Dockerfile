FROM node:20-alpine AS build

RUN apk add --no-cache python3 make g++

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev  # ou npm install --production

COPY . .

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app /app

CMD ["node", "src/server.js"]

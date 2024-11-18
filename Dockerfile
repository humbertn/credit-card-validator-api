# Build it
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Run it
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 3001
CMD ["node", "dist/index.js"]

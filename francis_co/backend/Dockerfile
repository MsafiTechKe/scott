FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --production
COPY . .
ENV NODE_ENV=production
EXPOSE 8080
CMD ["node","src/index.js"]

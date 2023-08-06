FROM node:18.16.1-bullseye

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

EXPOSE 3000 

CMD ["npm", "start"]

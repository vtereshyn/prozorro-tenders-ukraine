FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD npm run dev
EXPOSE 3003
FROM node:8.11.1

RUN mkdir /app
WORKDIR /app
COPY . /app/
RUN npm set strict-ssl false
RUN npm install
ENTRYPOINT ["/usr/local/bin/npm", "run", "start"]

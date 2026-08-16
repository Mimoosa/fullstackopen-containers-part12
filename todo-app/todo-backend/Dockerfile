FROM node:24
WORKDIR /usr/src/app
COPY . .
RUN npm ci
ENV DEBUG=express:*
CMD ["npm", "start"]
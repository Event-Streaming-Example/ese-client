FROM node:16.15.0

LABEL ese.image.author="saumyabhatt10642"

WORKDIR /client

COPY public/ /client/public
COPY src/ /client/src
COPY package.json /client/

RUN npm install

CMD [ "npm", "run", "simulate" ]

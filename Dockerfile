FROM node:6.1.0

ADD ./package.json /starlord/package.json
WORKDIR /starlord

RUN npm install
ADD . /starlord

CMD npm start

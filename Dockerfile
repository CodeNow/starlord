FROM node:6.10.2

ADD ./package.json /starlord/package.json
WORKDIR /starlord

RUN npm install
ADD . /starlord

CMD npm start

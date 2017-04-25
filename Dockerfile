FROM node:6.1.0

ADD ./package.json /guard/package.json
WORKDIR /guard

RUN npm install
ADD . /guard

CMD npm start

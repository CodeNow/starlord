FROM node:6.10.2

RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /wait.sh
RUN chmod +x /wait.sh

ADD ./package.json /starlord/package.json
WORKDIR /starlord

RUN npm install
ADD . /starlord

CMD npm start

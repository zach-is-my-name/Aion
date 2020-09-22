#executer: node run index.js
FROM node:alpine 
#:WORKDIR /executor
RUN apk add --no-cache bash
RUN /bin/bash -c "pwd"
COPY ./package.json .
RUN /bin/bash -c "npm install" 
ENTRYPOINT ["node", "index.js"] 

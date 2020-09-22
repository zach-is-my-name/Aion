#executer: node run index.js
FROM node:alpine 
COPY ./package.json .
RUN apk add --no-cache bash
RUN /bin/bash -c "npm install" 
WORKDIR /executor
ENTRYPOINT ["node", "index.js"] 

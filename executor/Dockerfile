#executer: node run index.js
FROM node:alpine 
WORKDIR /executor
COPY ./package.json .
RUN apk add --no-cache bash
RUN /bin/bash -c "npm install" 
ENTRYPOINT ["node", "index.js"] 

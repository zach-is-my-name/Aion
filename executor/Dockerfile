#executer: node run index.js
FROM node:alpine 
COPY ./executer/package.json ./executer/
RUN apk add --no-cache bash
WORKDIR /executor
RUN /bin/bash -c "npm install" 
ENTRYPOINT ["node", "index.js"] 

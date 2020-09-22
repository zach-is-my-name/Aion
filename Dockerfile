#executer: node run index.js
FROM node:alpine 
RUN apk add --no-cache bash
RUN /bin/bash -c "pwd && ls"
WORKDIR /executor
RUN /bin/bash -c "pwd && ls"
COPY package.json .
#RUN /bin/bash -c "npm install --silent" 
#ENTRYPOINT ["node", "index.js"] 

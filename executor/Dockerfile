#executer: node run index.js
FROM node:alpine 
RUN apk add --no-cache bash && apk --update add gcc make g++ zlib-dev 
WORKDIR ./executor
COPY --chown=node:node . ./
RUN /bin/bash -c "npm install --silent"  
#ENTRYPOINT ["node", "index.js"] 

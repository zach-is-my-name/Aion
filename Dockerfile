#executer: node run index.js
FROM node:alpine 
RUN apk add --no-cache bash && apk --update add gcc make g++ zlib-dev 
COPY . .
WORKDIR /executor
#ENTRYPOINT ["/bin/bash"]
RUN /bin/bash -c "npm install --silent" 
ENTRYPOINT ["node", "index.js"] 

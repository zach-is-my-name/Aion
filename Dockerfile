#executer: node run index.js
FROM node:alpine 
RUN apk add --no-cache bash && apk add --no-cache netcat-openbsd && nc 192.168.64.3 8546 &> /dev/null; echo $?
#COPY . .
#WORKDIR /executor
#RUN /bin/bash -c "npm install --silent" 
#ENTRYPOINT ["node", "index.js"] 

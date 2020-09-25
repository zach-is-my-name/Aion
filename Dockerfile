#executer: node run index.js
FROM node:alpine 
RUN apk add --no-cache bash && apk add --no-cache netcat-openbsd  
RUN /bin/bash c "-zv 192.168.64.3 80"
#COPY . .
#WORKDIR /executor
#RUN /bin/bash -c "npm install --silent" 
#ENTRYPOINT ["node", "index.js"] 

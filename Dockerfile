#executer: node run index.js
FROM node:alpine 
RUN apk add --no-cache bash
RUN ["/bin/bash", "-c", "cat < /dev/tcp/127.0.0.1/22"]
#COPY . .
#WORKDIR /executor
#RUN /bin/bash -c "npm install --silent" 
#ENTRYPOINT ["node", "index.js"] 

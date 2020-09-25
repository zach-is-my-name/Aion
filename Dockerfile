#executer: node run index.js
FROM node:alpine 
RUN apk add --no-cache bash
ENTRYPOINT ["/bin/bash"]
COPY . .
WORKDIR /executor
RUN /bin/bash -c "npm install --silent" 
ENTRYPOINT ["node", "index.js"] 

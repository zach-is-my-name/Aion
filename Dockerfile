#executer: node run index.js
FROM node:alpine 
RUN apk add --no-cache bash && apk --update add gcc make g++ zlib-dev 
#RUN ["/bin/bash", "-c", "npm install -g npm@7.0.15"]
COPY . ./
WORKDIR /executor
SHELL ["/bin/bash", "-c"] 
RUN npm install --silent  
CMD ["node","index.js"] 

#executer: node run index.js
FROM node:alpine 
RUN apk add --no-cache bash \  
&& apk add --no-cache git  \
&& git clone https://github.com/zach-is-my-name/Aion.git#dockerDebug
WORKDIR /executor
#ENTRYPOINT ["/bin/bash"]
RUN /bin/bash -c "npm install " #silent 
ENTRYPOINT ["node", "index.js"] 

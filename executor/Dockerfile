#executer: node run index.js
FROM node:alpine 
COPY ./package.json .
RUN /bin/bash -c "npm install" 
CMD ["node", "index.js"]


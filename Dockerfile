FROM --platform=x86-64 ubuntu:16.04 
#install mongodb
RUN apt-get update  \
&& apt-get install -y apt-utils \
&& apt-get install -y apt-transport-https ca-certificates \
&& apt-get install  wget 
FROM mongo
#install ganache-cli
FROM trufflesuite/ganache-cli
RUN mkdir -p /AionGoalZapp/DockerTruffle \      
           cd /AionGoalZapp/DockerTruffle \        
           git clone https://github.com/gjeanmart/truffle-docker

#install truffle 
FROM gjeanmart/truffle-docker 
WORKDIR ./executor
RUN npm install 




 

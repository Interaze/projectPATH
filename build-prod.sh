#!/bin/bash
docker build -f FrontEnd/Dockerfile-Dynamic-Front . -t projectpath-dynamic-front-prod:latest
docker build -f FrontEnd/Dockerfile-Static-Front . -t projectpath-static-front-prod:latest
docker build -f API/Dockerfile-Dynamic-API . -t projectpath-api-prod:latest
docker build -f API/Dockerfile-Static-API . -t projectpath-api-route-prod:latest

docker tag projectpath-dynamic-front-prod:latest interaze/projectpath-dynamic-front-prod:latest
docker tag projectpath-static-front-prod:latest interaze/projectpath-static-front-prod:latest
docker tag projectpath-api-prod:latest interaze/projectpath-api-prod:latest
docker tag projectpath-api-route-prod:latest interaze/projectpath-api-route-prod:latest

docker push interaze/projectpath-dynamic-front-prod:latest
docker push interaze/projectpath-static-front-prod:latest
docker push interaze/projectpath-api-prod:latest
docker push interaze/projectpath-api-route-prod:latest
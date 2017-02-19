all: build stack-dev

build: build-api build-web

build-api:
	yarn start
	docker build -t printat-api ./api

build-web:
	docker build -t printat-web ./web

stack-dev:
	docker stack deploy -c docker-stack-dev.yml printat

stack-prod:
	docker stack deploy -c docker-stack.yml printat

kill:
	docker stack rm printat
	docker rm -f $(docker ps -qa)

# run-web:
#	docker run -d -p 3001:3000 -p 3002:3002 -p 8001:8000 --rm printat-web

# debug-web:
#	docker run -it --rm printat-web sh

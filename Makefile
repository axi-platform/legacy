all: build stack-dev

build: build-api build-web

build-api:
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

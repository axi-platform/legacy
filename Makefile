all: dev

dev: build-dev build-prod
prod: build-prod run-prod

build-dev: dev-api dev-web
build-prod: prod-api prod-web

dev-api:
	docker build -t printat-api ./api

dev-web:
	docker build -t printat-web ./web

prod-api:
	cd api && yarn bundle && cd ..
	docker build -t printat-api-prod -f ./api/Dockerfile.prod ./api

prod-web:
	cd web && yarn run build -- --release && cd ..
	docker build -t printat-web-prod -f ./web/Dockerfile.prod ./web

run-dev:
	docker stack deploy -c docker-stack-dev.yml printat

run-prod:
	docker stack deploy -c docker-stack.yml printat

kill:
	docker stack rm printat
	docker rm -f $(docker ps -qa)

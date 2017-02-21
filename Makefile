all: dev

dev: build-dev run-dev
prod: build-prod run-prod

build-dev: dev-api dev-web prod-nginx
build-prod: prod-api prod-web prod-nginx

dev-api:
	docker build -t axi-api ./api

dev-web:
	docker build -t axi-web ./web

prod-api:
	cd api && yarn run bundle && cd ..
	docker build -t axi-api-prod -f ./api/Dockerfile.prod ./api

prod-web:
	cd web && yarn run build -- --release && cd ..
	docker build -t axi-web-prod -f ./web/Dockerfile.prod ./web

prod-nginx:
	docker build -t axi-nginx ./nginx

run-dev:
	docker stack deploy -c docker-stack-dev.yml axi

run-prod:
	docker stack deploy -c docker-stack.yml axi

kill:
	docker stack rm axi
	docker rm -f $(docker ps -q)

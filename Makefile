# If the first argument is one of the supported commands...
SUPPORTED_COMMANDS := install run-dev build preview docker-start docker-stop readme-tree
SUPPORTS_MAKE_ARGS := $(findstring $(firstword $(MAKECMDGOALS)), $(SUPPORTED_COMMANDS))
ifneq "$(SUPPORTS_MAKE_ARGS)" ""
    # use the rest as arguments for the command
    COMMAND_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
    # ...and turn them into do-nothing targets
    $(eval $(COMMAND_ARGS):;@:)
endif

install-dev:
	docker compose -f docker-compose.dev.yml run --rm bibcnrs-front-dev-npm install

install:
	docker compose -f docker-compose.dev.yml run --rm bibcnrs-front-dev-npm ci

git-pull:
	git pull

npm-build:
	npm run build

preview:
	npm run preview

build:
	docker compose -f docker-compose.yml build --build-arg BIBFRONT_VERSION --build-arg BIBAPI_HOST

cleanup-dev-docker: ## remove all bibcnrs-front docker image
	test -z "$$(docker ps -a | grep bibcnrs-dev-front)" || \
            docker rm --force $$(docker ps -a | grep bibcnrs-dev-front | awk '{ print $$1 }')

run-dev: ## run project in development mode
	make cleanup-dev-docker
	docker compose -f docker-compose.dev.yml up --force-recreate bibcnrs-front-dev-server

stop: ## stop all bibcnrs-front docker image
	test -z "$$(docker ps | grep bibcnrs-front)" || \
            docker stop $$(docker ps -a | grep bibcnrs-front | awk '{ print $$1 }')

cleanup-docker: ## remove all bibcnrs-front docker image
	test -z "$$(docker ps -a | grep bibcnrs-front)" || \
            docker rm --force $$(docker ps -a | grep bibcnrs-front | awk '{ print $$1 }')

readme-tree:
	tree -d -n src > tree.txt

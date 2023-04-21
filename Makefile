# If the first argument is one of the supported commands...
SUPPORTED_COMMANDS := install run-dev build preview docker-start docker-stop readme-tree
SUPPORTS_MAKE_ARGS := $(findstring $(firstword $(MAKECMDGOALS)), $(SUPPORTED_COMMANDS))
ifneq "$(SUPPORTS_MAKE_ARGS)" ""
    # use the rest as arguments for the command
    COMMAND_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
    # ...and turn them into do-nothing targets
    $(eval $(COMMAND_ARGS):;@:)
endif

install:
	npm install

git-pull:
	git pull

npm-run-dev:
	npm run dev

npm-build:
	npm run build

preview:
	npm run preview

build:
	docker compose -f docker-compose.yml build --build-arg BIBFRONT_VERSION --build-arg BIBAPI_HOST

run-prod:
	docker compose -f docker-compose-prod.yml up -d

run-dev:
	docker compose -f docker-compose.yml up -d

stop: ## stop all bibcnrs-front docker image
	test -z "$$(docker ps | grep bibcnrs-front)" || \
            docker stop $$(docker ps -a | grep bibcnrs-front | awk '{ print $$1 }')

cleanup-docker: ## remove all bibcnrs-front docker image
	test -z "$$(docker ps -a | grep bibcnrs-front)" || \
            docker rm --force $$(docker ps -a | grep bibcnrs-front | awk '{ print $$1 }')

build-start-prod: build run-prod

stop-build-start-prod: stop cleanup-docker build-start-prod

update-stop-build-start-prod: git-pull stop-build-start-prod

readme-tree:
	tree -d -n src > tree.txt

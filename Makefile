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

run-dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

docker-start:
	docker compose -f docker-compose.yml build --no-cache && \
	docker compose -f docker-compose.yml up -d

docker-stop:
	docker-compose -f docker-compose.yml down --rmi all

readme-tree:
	tree -d -n src > tree.txt

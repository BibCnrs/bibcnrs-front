install:
	npm install

run-dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

docker-start:
	docker compose -f docker-compose.yml -p bibcnrs-front rm -f && \
	docker compose -f docker-compose.yml -p bibcnrs-front build --no-cache && \
	docker compose -f docker-compose.yml -p bibcnrs-front up

readme-tree:
	tree -d -n src > tree.txt

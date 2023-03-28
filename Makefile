install:
	npm install

run-dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

docker-start:
	docker compose --project-name foo -f docker-compose.yml -p bibcnrs-front rm -f && \
	docker iamge rm bibcnrs-front_bibcnrs-front && \
	docker compose --project-name foo -f docker-compose.yml -p bibcnrs-front build --no-cache && \
	docker compose --project-name foo -f docker-compose.yml -p bibcnrs-front up -d

readme-tree:
	tree -d -n src > tree.txt

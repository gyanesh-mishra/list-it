#!make

app:
	@echo "+\n++ Running application in background...\n+"
	@docker-compose up -d

app-prod:
	@echo "+\n++ Running application in production mode background...\n+"
	@docker-compose -f docker-compose-prod.yml up -d

app-logs:
	@echo "+\n++ Following app container for logs...\n+"
	@docker logs -f list-it-app

build:
	@echo "+\n++ Building images...\n+"
	@docker-compose build --parallel

stop:
	@echo "+\n++ Stopping application ...\n+"
	@docker-compose down -t 2

clean:
	@echo "+\n++ Removing containers, images, volumes etc...\n+"
	@docker-compose down --rmi all --volumes
	@docker-compose rm -f -v -s

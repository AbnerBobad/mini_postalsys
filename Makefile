## Filename Makefile
include .envrc

.PHONY: db/psql
db/psql:
	psql ${WEBBASICS_DB_DSN}


## db/migrations/new name=$1: create a new database migration
.PHONY: db/migrations/new
db/migrations/new:
	@echo 'Creating migration files for ${name}...'
	migrate create -seq -ext=.sql -dir=./src/migrations ${name}


## db/migrations/up: apply all up database migrations
.PHONY: db/migrations/up
db/migrations/up:
	@echo 'Running up migrations...'
	migrate -path ./src/migrations -database ${WEBBASICS_DB_DSN} up

# db/migrations/down-1: undo the last migration
.PHONY: db/migrations/down-1
db/migrations/down-1:
	@echo 'Running up migrations...'
	migrate -path ./src/migrations -database ${WEBBASICS_DB_DSN} down 1

## db/migrations/fix:  fix a SQL migration
.PHONY: db/migrations/fix
db/migrations/fix:
	@echo 'Checking migration status...'
	@migrate -path ./src/migrations -database $${WEBBASICS_DB_DSN} version > /tmp/migrate_version 2>&1
	@cat /tmp/migrate_version
	@if grep -q "dirty" /tmp/migrate_version; then \
		version=$$(grep -o '[0-9]\+' /tmp/migrate_version | head -1); \
		echo "Found dirty migration at version $$version"; \
		echo "Forcing version $$version..."; \
		migrate -path ./src/migrations -database $${WEBBASICS_DB_DSN} force $$version; \
		echo "Running down migration..."; \
		migrate -path ./src/migrations -database $${WEBBASICS_DB_DSN} down 1; \
		echo "Running up migration..."; \
		migrate -path ./src/migrations -database $${WEBBASICS_DB_DSN} up; \
	else \
		echo "No dirty migration found"; \
	fi
	@rm -f /tmp/migrate_version
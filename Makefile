process: migrate
	@node -r dotenv/config lib/processor.js


build:
	@npm run build


serve:
	@npx squid-graphql-server


migrate:
	@npx squid-typeorm-migration apply


codegen:
	@npx squid-typeorm-codegen


typegen-kusama:
	@npx squid-substrate-typegen typegen-kusama.json
typegen-polkadot:
	@npx squid-substrate-typegen typegen-polkadot.json

typegen: typegen-kusama typegen-polkadot

up:
	@docker-compose up -d

down:
	@docker-compose down

deploy: codegen typegen-$(network)
	@API_DEBUG=true npx sqd squid update balances-$(network)@$(version) -v -e NETWORK=$(network)

.PHONY: build serve process migrate codegen typegen up down

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

typegen-khala:
	@npx --yes @subsquid/substrate-typegen typegenKhala.json
typegen-kusama:
	@npx --yes @subsquid/substrate-typegen typegenKusama.json
typegen-polkadot:
	@npx --yes @subsquid/substrate-typegen typegenPolkadot.json

typegen: typegen-kusama typegen-polkadot


up:
	@docker-compose up -d


down:
	@docker-compose down


.PHONY: build serve process migrate codegen typegen up down

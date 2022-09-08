process: migrate
	@node -r dotenv/config lib/processor.js


build:
	@npm run build


serve:
	@npx squid-graphql-server


migrate:
	@npx squid-typeorm-migration apply

codegen:
	@npx --yes @subsquid/typeorm-codegen

typegen-litentry:
	@npx --yes @subsquid/substrate-typegen typegen/typegen-litentry.json
typegen-litmus:
	@npx --yes @subsquid/substrate-typegen typegen/typegen-litmus.json
typegen-khala:
	@npx --yes @subsquid/substrate-typegen typegen/typegen-khala.json
typegen-kusama:
	@npx --yes @subsquid/substrate-typegen typegen/typegen-kusama.json
typegen-polkadot:
	@npx --yes @subsquid/substrate-typegen typegen/typegen-polkadot.json

typegen: typegen-litentry typegen-litmus typegen-khala typegen-kusama typegen-polkadot


up:
	@docker-compose up -d


down:
	@docker-compose down


.PHONY: build serve process migrate codegen typegen up down

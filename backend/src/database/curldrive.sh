#!/bin/sh
#tsv="$(curl -s -L "https://docs.google.com/spreadsheets/d/1oJWBfQyIfzXj173ok0gaGMYpIaz6HTrakepqrRuS894/export?exportFormat=tsv")"
tsv="$(curl -s -L "https://docs.google.com/spreadsheets/d/1Z28JQVngQ2tkaP0Yn54jiIQ80vNqcdcCoYbLgamU9Y4/export?exportFormat=tsv")"
videos_tsv="$(curl -s -L "https://docs.google.com/spreadsheets/d/1Z28JQVngQ2tkaP0Yn54jiIQ80vNqcdcCoYbLgamU9Y4/export?exportFormat=tsv&gid=240640546")"

tsv=$(echo "$tsv" | tail -n +2)
videos_tsv=$(echo "$videos_tsv" | tail -n +2)

echo "$tsv" > ./seeds/textuais.tsv
echo "$videos_tsv" > ./seeds/videos.tsv

echo "$tsv" | jq -rRs 'split("\n")[1:-1] |
	map([split("\t")[]] | {
		id:.[0]|tonumber,
		"titulo":.[1],
		"autor":.[2],
		"generoDocumental":.[3],
		"tipoDocumental":.[4],
		"apresentacaoGrafica":.[5],
		"area":.[6],
		"assunto":.[7],
		"dataProducao":.[8],
		"instituicao":.[9],
		"ambito":.[10],
		"orientador":.[11],
		"recorteTemporal":.[12],
		"recorteEspacial":.[13],
		"local":.[14],
		"link":.[15],
	})' > /var/www/src/acervo/backend/src/database/seeds/trabalhos.json

echo "$videos_tsv" | jq -rRs 'split("\n")[1:-1] |
	map([split("\t")[]] | {
		id:.[0]|tonumber,
		"titulo":.[1],
		"autor":.[2],
		"equipe":.[3],
		"generoDocumental":.[4],
		"tipoDocumental":.[5],
		"apresentacaoGrafica":.[6],
		"dataProducao":.[7],
		"instituicao":.[8],
		"ambito":.[9],
		"link":.[10],
	})' > /var/www/src/acervo/backend/src/database/seeds/videos.json

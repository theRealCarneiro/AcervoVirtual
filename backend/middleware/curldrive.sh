#!/bin/sh
tsv="$(curl -s -L "https://docs.google.com/spreadsheets/d/1oJWBfQyIfzXj173ok0gaGMYpIaz6HTrakepqrRuS894/export?exportFormat=tsv")"
echo "$tsv" | tail -n +4 | sed 's/.//' | jq -rRs 'split("\n")[1:-1] |
	map([split("\t")[]] | {
		id:.[0],
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
	})' > bd.json

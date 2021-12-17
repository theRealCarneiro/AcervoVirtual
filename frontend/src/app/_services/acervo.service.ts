import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Acervo{
	id!: number;
	titulo!: string;
	autor!: string;
	generoDocumental!: string;
	tipoDocumental!: string;
	apresentacaoGrafica!: string;
	area!: string;
	assunto!: string;
	dataProducao!: string;
	instituicao!: string;
	ambito!: string;
	orientador!: string;
	recorteTemporal!: string;
	recorteEspacial!: string;
	local!: string;
	link!: string;
}

export class TrabalhosStatus {
	status!: number;
	trabalhos!: Acervo[];
}


@Injectable({
	providedIn: 'root'
})
export class AcervoService {
	host = '/acervo/api';
	// host: string = 'https://observatorio.ufsj.edu.br/api';

	constructor(private http: HttpClient) {}

	getJsonBD(): Observable<Acervo[]> {
		return this.http.get<Acervo[]>('/acervo/assets/bd/bd.json');
	}

	// getTrabalhos(): Observable<Acervo[]> {
	getTrabalhos(trabalho: any): Observable<any> {
		if (trabalho) {
			return this.http.put(this.host + '/trabalhos', { trabalho });
		}
		return this.http.get(this.host + '/trabalhos');
	}

	getTrabalho(id: number): Observable<any> {
		return this.http.get(this.host + '/trabalhos' + id);
	}
}

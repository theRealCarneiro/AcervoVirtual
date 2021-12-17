import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Acervo{
	id!: number;
	autor!: string;
	descricao!: string;
	link!: string;
}


@Injectable({
	providedIn: 'root'
})
export class AcervoService {
	host = '/acervo/api';
	// host = 'localhost:43001';
	// host: string = 'https://observatorio.ufsj.edu.br/api';

	constructor(private http: HttpClient) {}

	getJsonBD(): Observable<Acervo[]> {
		return this.http.get<Acervo[]>('/acervo/assets/bd/bd.json');
	}

	getTrabalhos(): Observable<Acervo[]> {
		return this.http.get<Acervo[]>(this.host + '/acervo');
	}

	getTrabalho(id: number): Observable<Acervo> {
		return this.http.get<Acervo>(this.host + '/acervo/' + id);
	}
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acervo } from './acervo.service';

export class InsertStatus {
	status: number;
	id: number;
}

@Injectable({
	providedIn: 'root'
})
export class AdminService {
	host = '/acervo/api';
	// host = 'https://observatorio.ufsj.edu.br/api';

	constructor(private http: HttpClient) {}

	adicionar(trabalho: Acervo): Observable<any> {
		return this.http.post(this.host + '/trabalhos', { trabalho });
	}

	editar(trabalho: Acervo): Observable<any> {
		return this.http.patch(this.host + '/trabalhos/' + trabalho.id, { trabalho });
	}

	remover(id: number): Observable<any>{
		return this.http.delete(this.host + '/trabalhos/' + id);
	}

	atualizarJson(): Observable<any> {
		return this.http.get(this.host + '/admin/update_json');
	}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acervo } from './acervo.service';

@Injectable({
	providedIn: 'root'
})
export class AdminService {
	host = '/acervo/api';
	// host = 'https://observatorio.ufsj.edu.br/api';

	constructor(private http: HttpClient) {}

	adicionar(acervo: Acervo): Observable<any> {
		return this.http.post(this.host + '/admin', acervo);
	}

	editar(acervo: Acervo): Observable<any> {
		return this.http.patch(this.host + '/admin/' + acervo.id, acervo);
	}

	remover(id: number): Observable<any>{
		return this.http.delete(this.host + '/admin/' + id);
	}

	atualizarJson(): Observable<any> {
		return this.http.get(this.host + '/admin/update_json');
	}
}

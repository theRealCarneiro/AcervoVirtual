import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acervo } from '../acervo/acervo.component';

@Injectable({
  providedIn: 'root'
})
export class AcervoService {
	host: string = '/api';
	//host: string = 'http://alice.dcomp.ufsj.edu.br:33001';

  constructor(private http: HttpClient) {}

	getTrabalhos(): Observable<Acervo[]> {
		return this.http.get<Acervo[]>(this.host + '/acervo');
	}

	getTrabalho(id: number): Observable<Acervo> {
		return this.http.get<Acervo>(this.host + '/acervo/' + id);
	}

	adicionar(acervo: Acervo): Observable<any> {
		return this.http.post(this.host + '/administrador', acervo);
	}

	editar(acervo: Acervo): Observable<any> {
		return this.http.patch(this.host + '/administrador/' + acervo.id, acervo);
	}

	remover(id: number): Observable<any>{
		return this.http.delete(this.host + '/administrador/' + id);
	}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acervo } from './acervo/acervo.component';

@Injectable({
  providedIn: 'root'
})
export class AcervoService {

  constructor(private http: HttpClient) {}
    //
    getTrabalhos(): Observable<Acervo[]> {

      return this.http.get<Acervo[]>("http://localhost:3000/acervo");

    } 
    adicionar(acervo: Acervo): Observable<any> {
      return this.http.post("http://localhost:3000/administrador", acervo);
    }
    
    getTrabalho(id: number): Observable<Acervo> {
      //console.log(acervoId)
      return this.http.get<Acervo>("http://localhost:3000/administrador/" + id);
    }
    editar(acervo: Acervo): Observable<any> {
      return this.http.patch("http://localhost:3000/administrador/" + acervo.id, acervo);

    }
    remover(id: number): Observable<any>{
      return this.http.delete("http://localhost:3000/administrador/" + id);

    }
}

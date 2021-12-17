import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap, shareReplay } from 'rxjs/operators';

export interface UserStatus {
	success: boolean;
	token: string;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	host = '/acervo/api';
	// host = 'http://alice.dcomp.ufsj.edu.br:33001';

	constructor(private http: HttpClient) { }

	private setSession(authResult: UserStatus): void{
		localStorage.setItem('token', authResult.token);
	}

	getLoggedStatus(): boolean {
		const token = localStorage.getItem('token') || undefined;
		const helper = new JwtHelperService();
		return helper.isTokenExpired(token) ? false : true;
	}

	login(usuario: string, senha: string): Observable<UserStatus> {
		return this.http.put<UserStatus>(this.host + '/login', { usuario, senha })
			.pipe(tap((res: UserStatus) => this.setSession(res)),
			shareReplay());
	}

	loggout(): void{
		localStorage.removeItem('id');
	}
}

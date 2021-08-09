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
		localStorage.setItem('id', authResult.token);
	}

	getLoggedStatus(): boolean{
		const id = localStorage.getItem('id') || undefined;
		const helper = new JwtHelperService();
		return helper.isTokenExpired(id) ? false : true;
	}

	login(user: string, password: string): Observable<UserStatus>{
		return this.http.post<UserStatus>(this.host + '/login', {user, password})
			.pipe(tap((res: UserStatus) => this.setSession(res)),
			shareReplay());
	}

	loggout(): void{
		localStorage.removeItem('id');
	}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { tap, shareReplay } from 'rxjs/operators';

export interface UserStatus {
	success: boolean
	token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	host: string = '/api';

  constructor(private http: HttpClient) { }

	private setSession(authResult: UserStatus) {
		localStorage.setItem('id', authResult.token);
	}

	getLoggedStatus(){
		const id = localStorage.getItem('id') || undefined;
		const helper = new JwtHelperService();
		return helper.isTokenExpired(id) ? false : true;
	}

  login(user: string, password: string){
	  return this.http.post<UserStatus>(this.host + '/login', {user, password})
			.pipe(tap((res: UserStatus) => this.setSession(res)),
      shareReplay());
  }

	loggout(){
		localStorage.removeItem('id');
	}
}

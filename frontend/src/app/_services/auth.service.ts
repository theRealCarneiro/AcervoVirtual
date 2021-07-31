import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

export interface UserStatus {
	success: boolean
	token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	host: string = 'http://alice.dcomp.ufsj.edu.br:33001';

  constructor(private http: HttpClient) { }

	loggout(){
		localStorage.removeItem('id');
	}

	getLoggedStatus(){
		const id = localStorage.getItem('id') || undefined;
		//const helper = new JwtHelperService();
		//console.log(helper.decodeToken(id));
		//if(helper.isTokenExpired(id)){
			//console.log('fedeu');
		//} else console.log('deu');
		return this.http.post<UserStatus>(this.host + '/auth', {id});
	}

  getUserDetails(user: string, password: string){
	  return this.http.post<UserStatus>(this.host + '/login', {user, password});
  }
}

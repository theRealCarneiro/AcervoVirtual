import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
		return this.http.get(this.host + '/loggout');
	}

	getLoggedStatus(){
		const id = localStorage.getItem('id');
		return this.http.post<UserStatus>(this.host + '/auth', {id});
	}

  getUserDetails(user: string, password: string){
	  return this.http.post<UserStatus>(this.host + '/login', {user, password});
  }
}

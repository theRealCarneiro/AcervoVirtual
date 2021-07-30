import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UserStatus {
	success: boolean
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
		return this.http.get<UserStatus>(this.host + '/auth');
	}

  getUserDetails(user: string, password: string){
	  return this.http.post<UserStatus>(this.host + '/login', {user, password});
  }
}

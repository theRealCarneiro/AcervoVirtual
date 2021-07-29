import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserStatus {
	success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	host: string = '/api';

	private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor(private http: HttpClient) { }

	setLoggedIn(status: boolean): void{
			this.loggedInStatus = status;
			localStorage.setItem('loggedIn', status.toString())
	}

	get loggedStatus(): boolean{
			return this.loggedInStatus;
	}

  getUserDetails(username: string, password: string){
	  return this.http.post<UserStatus>(this.host + '/login', {username, password});
  }
}

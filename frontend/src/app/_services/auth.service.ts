import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import axios from "axios";
import { AxiosInstance } from "axios";

export interface UserStatus {
	success: boolean
	token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	//private host: string = '/api';
	//private host: string = 'http://189.12.134.161:7777';
	private host: string = 'http://localhost:7777';
	private axios: AxiosInstance;

	constructor(private http: HttpClient) { }

	loggout(){
		localStorage.removeItem('id');
	}

	getLoggedStatus(){
		//const id = localStorage.getItem('id') || undefined;
		return axios.post(this.host + '/auth').then(res => {
			//console.log(res.data.success);
			return res.data.success;
		});
	}

	getUserDetails(user: string, password: string){
		return this.http.post<UserStatus>(this.host + '/login', {user, password});
	}
}

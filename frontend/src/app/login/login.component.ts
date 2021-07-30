import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

	loginUser(event: any) {
		event.preventDefault();
		const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value

		this.auth.getUserDetails(username, password).subscribe(data => {
			if(data.success){
				localStorage.setItem('id', data.token);
				this.route.navigate(['/admin']);
			}
		});
	}

}

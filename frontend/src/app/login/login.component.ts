import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router } from "@angular/router"
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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

		this.auth.login(username, password).subscribe(() => {
			this.route.navigate(['/admin']);
		});
	}

}

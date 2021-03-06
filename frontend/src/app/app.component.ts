import { Component, OnInit, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faFacebook, faInstagram  } from '@fortawesome/free-brands-svg-icons';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'Observatório Urbano';
	faFacebook = faFacebook;
	faInstagram = faInstagram;
	faLight = faMoon;
	faDark = faSun;
	faCurrent = this.faLight;

	@HostBinding('class') className = '';
	toggleControl = new FormControl(false);

	darkModeToggle(): void{
		if (this.className === ''){
			localStorage.setItem('darkMode', 'true');
			this.faCurrent = this.faDark;
			this.className = 'darkMode';
		}else{
			localStorage.removeItem('darkMode');
			this.faCurrent = this.faLight;
			this.className = '';
		}
	}

	getLoggedStatus(): boolean {
		const token = localStorage.getItem('token') || null;
		return token ? true : false;
	}

	ngOnInit(): void {
		const darkMode = localStorage.getItem('darkMode') || false;
		if (darkMode !== false){
			this.className = 'darkMode';
			this.faCurrent = this.faDark;
		}
		else{
			this.className = '';
			this.faCurrent = this.faLight;
		}
	}
}

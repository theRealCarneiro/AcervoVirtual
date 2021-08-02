import { Component, OnInit, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-observatorio';
	faFacebook = faFacebook;
	faInstagram = faInstagram;

	@HostBinding('class') className = '';
	toggleControl = new FormControl(false);
	icon: string = ''

	darkModeToggle(): void{
			if (this.icon == "brightness_4"){
				localStorage.setItem('darkMode', 'true');
				this.icon = "bedtime";
				this.className = 'darkMode';
			}else{
				localStorage.removeItem('darkMode');
				this.icon = "brightness_4";
				this.className = '';
			}
	}

	getLoggedStatus(): boolean {
		let id = localStorage.getItem('id') || null;
		return id ? true : false; 
	}

	ngOnInit(): void {
		let darkMode = localStorage.getItem('darkMode') || false;
		if(darkMode != false){
			this.className = 'darkMode';
			this.icon = 'bedtime';
		}
		else{
			this.className = '';
			this.icon = 'brightness_4';
		}
	}
}

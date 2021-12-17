import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Foto, AcervoService } from '../_services/acervo.service';

@Component({
	selector: 'app-fotos',
	templateUrl: './fotos.component.html',
	styleUrls: ['./fotos.component.scss']
})
export class FotosComponent implements OnInit {
	dataSource!: Foto[];

	constructor(private service: AcervoService) { }

	ngOnInit(): void {
		this.service.getFotos().subscribe(foto => this.dataSource = foto);
		console.log(this.dataSource);
	}

}

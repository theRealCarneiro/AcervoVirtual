import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenu } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { Acervo } from '../_services/acervo.service';

@Component({
	selector: 'app-dialog-mng-filtro',
	templateUrl: 'dialog-mng-filtro.html'
})
export class FiltroDialogComponent implements OnInit {
	filtrar = true;

	constructor(public dialogRef: MatDialogRef<FiltroDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Acervo) {}

	ngOnInit(): void{	}

	onNoClick(): void {
		this.filtrar = false;
		this.dialogRef.close();
	}
}

@Component({
	selector: 'app-dialog-mng-admin',
	templateUrl: 'dialog-mng-admin.html'
})
export class MngAdminDialogComponent {
	public tipoDialogo = '';
	public salvar = true;
	constructor(public dialogRef: MatDialogRef<MngAdminDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Acervo) {}

	onNoClick(): void{
		this.salvar = false;
		this.dialogRef.close();
	}
}

@Component({
	selector: 'app-dialog-mng-acervo',
	templateUrl: 'dialog-mng-acervo.html',
	styleUrls: ['./dialog-mng-acervo.scss'],
})
export class MngAcervoDialogComponent implements OnInit {
	constructor(public dialogRef: MatDialogRef<MngAcervoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Acervo) {}
	public video = false;
	public link = '';

	ngOnInit(): void{
		if (this.data.tipoDocumental === 'Vídeo'){
			this.video = true;
			this.link = this.data.link.substring(32);
		}
	}

	download(): void{
		window.open(this.data.link);
	}
	onNoClick(): void{
		this.dialogRef.close();
	}
}

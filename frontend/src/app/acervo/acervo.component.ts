import { Component, Inject, OnInit, ViewChild, AfterViewInit,  } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import { Acervo, AcervoService } from '../_services/acervo.service';
import { faDownload, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-acervo',
	templateUrl: './acervo.component.html',
	styleUrls: ['./acervo.component.scss']
})

export class AcervoComponent implements OnInit, AfterViewInit {
	displayedColumns: string[] = ['titulo', 'autor', 'acoes'];
	public dataSource = new MatTableDataSource<Acervo>();

	faDownload = faDownload;
	faQuestionCircle = faQuestionCircle;

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(private service: AcervoService, public dialog: MatDialog) { }

	ngOnInit(): void{
		// this.service.getJsonBD().then(
			// (acervo: Acervo[]) => this.dataSource.data = acervo
		// );
		this.service.getJsonBD().subscribe(acervo => this.dataSource.data = acervo);

		this.paginator._intl.itemsPerPageLabel = 'Itens por página';
		this.paginator._intl.nextPageLabel = 'Próxima página';
		this.paginator._intl.previousPageLabel = 'Página Anterior';
		this.paginator._intl.firstPageLabel = 'Primeira página';
		this.paginator._intl.lastPageLabel = 'Última página';
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	public doFilter = (value: string) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	download(acervo: Acervo): void{
		window.open(acervo.link);
	}


openViewDialog(acervo: Acervo): void{
	const darkMode = localStorage.getItem('darkMode') || false;
	const className = darkMode ? 'darkMode' : '';
	const dialogRef = this.dialog.open(MngAcervoDialogComponent, {
			width: '750px',
			panelClass: className,
			data: acervo
		});
	}
}

@Component({
	selector: 'app-dialog-mng-acervo',
	templateUrl: 'dialog-mng-acervo.html',
	styleUrls: ['./dialog-mng-acervo.scss'],
})

export class MngAcervoDialogComponent implements OnInit {
	constructor(public dialogRef: MatDialogRef<MngAcervoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Acervo) {}
	public orientador = true;
	public recorteTemporal = true;
	public recorteEspacial = true;
	public local = true;

	ngOnInit(): void{
		if (this.data.orientador === '-' || this.data.orientador === ''){
			this.orientador = false;
		}

		if (this.data.recorteTemporal === '-' || this.data.recorteTemporal === ''){
			this.recorteTemporal = false;
		}

		if (this.data.recorteEspacial === '-' || this.data.recorteEspacial === ''){
			this.recorteEspacial = false;
		}

		if (this.data.local === '-' || this.data.local === '') {
			this.local = false;
		}
	}

	download(): void{
	window.open(this.data.link);
	}
	onNoClick(): void{
		this.dialogRef.close();
	}

}


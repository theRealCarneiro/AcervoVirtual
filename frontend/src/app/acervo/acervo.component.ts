import { Component, Inject, OnInit, ViewChild, AfterViewInit,   } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import { Acervo, TrabalhosStatus, AcervoService } from '../_services/acervo.service';
import { FiltroDialogComponent, MngAcervoDialogComponent } from '../dialogs/dialogs.component';
import { faDownload, faQuestionCircle, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
	selector: 'app-acervo',
	templateUrl: './acervo.component.html',
	styleUrls: ['./acervo.component.scss']
})

export class AcervoComponent implements OnInit, AfterViewInit {
	displayedColumns: string[] = ['titulo', 'autor', 'acoes'];
	public dataSource = new MatTableDataSource<Acervo>();
	title = 'Trabalhos';
	downloadButton = true;

	faDownload = faDownload;
	faQuestionCircle = faQuestionCircle;
	faExternalLinkAlt = faExternalLinkAlt;

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(private service: AcervoService, public dialog: MatDialog, private router: Router) { }

	ngOnInit(): void{
		// this.service.getJsonBD().subscribe(acervo => this.dataSource.data = acervo);
		let trabalho = null;
		const route = this.router.url.substring(1);
		switch (route){
			case 'videos':
				this.title = 'Vídeos';
				this.downloadButton = false;
				trabalho = new Acervo();
				trabalho.tipoDocumental = 'Vídeo';
				break;
		}

		this.service.getTrabalhos(trabalho).subscribe(res => {
			if (res.status) {
				console.log(res.message);
			}
			else {
				this.dataSource.data = res.trabalhos;
			}
		});

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

	openFiltroDialog(): void{
		const darkMode = localStorage.getItem('darkMode') || false;
		const className = darkMode ? 'darkMode' : '';
		const dialogRef = this.dialog.open(FiltroDialogComponent, {
				width: '750px',
				panelClass: className,
				data: new Acervo()
		});

		dialogRef.afterClosed().subscribe(filtro => {
			if (dialogRef.componentInstance.filtrar) {
				this.service.getTrabalhos(filtro).subscribe(res => {
					res.status ? console.log(res.message) : this.dataSource.data = res.trabalhos;
				});
			}
		});
	}
}


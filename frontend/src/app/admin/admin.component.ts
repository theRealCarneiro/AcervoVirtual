import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenu } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { AdminService } from '../_services/admin.service';
import { Acervo, AcervoService } from '../_services/acervo.service';
import { faSyncAlt, faPlus, faTrashAlt, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {
	displayedColumns: string[] = ['id', 'titulo', 'autor', 'acoes'];
	dataSource = new MatTableDataSource<Acervo>();

	// Font Awesome
	faAdd = faPlus;
	faTrash = faTrashAlt;
	faQuestionCircle = faQuestionCircle;
	faSyncAlt = faSyncAlt;

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(
		private acervoService: AcervoService,
		private service: AdminService,
		public dialog: MatDialog
	) { }

	ngOnInit(): void{
		this.acervoService.getTrabalhos().subscribe(acervo => this.dataSource.data = acervo);

		this.paginator._intl.itemsPerPageLabel = 'Itens por página';
		this.paginator._intl.nextPageLabel = 'Próxima página';
		this.paginator._intl.previousPageLabel = 'Página Anterior';
		this.paginator._intl.firstPageLabel = 'Primeira página';
		this.paginator._intl.lastPageLabel = 'Última página';
	}

	atualizarJson(): void {
		this.service.atualizarJson().subscribe(() => { });
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	public doFilter = (value: string) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	openNewDialog(): void{
		const darkMode = localStorage.getItem('darkMode') || false;
		const className = darkMode ? 'darkMode' : '';
		const dialogRef = this.dialog.open(MngAdminDialogComponent, {
			width: '750px',
			panelClass: className,
			data: new Acervo()
		});

		dialogRef.componentInstance.tipoDialogo = 'Inserir';

		// adiciona um novo registro (trabalho) ao acervo
		dialogRef.afterClosed().subscribe(acervo => {

			if (dialogRef.componentInstance.salvar) {
				this.service.adicionar(acervo).subscribe(id => { // insere e recebe novo id
					acervo.id = id;
					this.dataSource.data = this.dataSource.data.concat(acervo); // concatena na tabela
				});
			}
		});
	}


	openEditDialog(acervo: Acervo): void{
		const darkMode = localStorage.getItem('darkMode') || false;
		const className = darkMode ? 'darkMode' : '';
		const dialogRef = this.dialog.open(MngAdminDialogComponent, {
			width: '750px',
			panelClass: className,
			data: acervo
		});

		dialogRef.componentInstance.tipoDialogo = 'Editar';

		// edita um registro (trabalho)
		dialogRef.afterClosed().subscribe(newAcervo => {
			// testa se foi o botao de salvar ou cancelar
			if (dialogRef.componentInstance.salvar) {
				this.service.editar(acervo).subscribe(() => { });
			}
		});
	}

	excluir(acervo: Acervo): void {
		if (confirm('Quer mesmo deletar este documento?' + name)) {
			this.service.remover(acervo.id).subscribe(_ => {
				this.dataSource.data = this.dataSource.data.filter(oldAcervo => oldAcervo.id !== acervo.id);
			});
		}
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

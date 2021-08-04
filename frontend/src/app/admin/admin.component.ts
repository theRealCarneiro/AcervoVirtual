import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenu } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { AcervoService } from '../_services/acervo.service';
import { faPlus, faTrashAlt, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

export class Acervo{
  id!: number;
  titulo!: string;
  autor!: string;
  generoDocumental!: string;
  tipoDocumental!: string;
  apresentacaoGrafica!: string;
  area!: string;
  assunto!: string;
  dataProducao!: string;
  instituicao!: string;
  ambito!: string;
  orientador!: string;
  recorteTemporal!: string;
  recorteEspacial!: string;
  local!: string;
  link!: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {
  displayedColumns: string[]=['id','titulo','autor','acoes'];
  dataSource = new MatTableDataSource<Acervo>();

  public tipo: string;

  // Font Awesome
  faAdd = faPlus;
  faTrash = faTrashAlt;
  faQuestionCircle = faQuestionCircle;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: AcervoService, public dialog: MatDialog) { }

  ngOnInit(){
    this.service.getTrabalhos().subscribe(acervo => this.dataSource.data = acervo);

    this.paginator._intl.itemsPerPageLabel="Itens por página";
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

  openNewDialog(): void{
    const dialogRef = this.dialog.open(MngAdminDialog, {
      width: '750px',
      data: new Acervo()
    });

    dialogRef.componentInstance.tipo_dialogo = "Inserir";

    // adiciona um novo registro (trabalho) ao acervo
    dialogRef.afterClosed().subscribe(acervo => {
      this.service.adicionar(acervo).subscribe(id => {
        // pega o id do novo registro
        this.service.getTrabalho(id).subscribe(newTrabalho => {
          // concatena ele a lista de trabalhos do front
          this.dataSource.data = this.dataSource.data.concat(newTrabalho);
        });
      });
    });
  }


  openEditDialog(acervo: Acervo): void{
    const dialogRef = this.dialog.open(MngAdminDialog, {
      width: '750px',
      data: acervo
    });

    dialogRef.componentInstance.tipo_dialogo = "Editar";

    // edita um registro (trabalho)
    dialogRef.afterClosed().subscribe(newAcervo => {
			if(dialogRef.componentInstance.salvar)
				this.service.editar(acervo).subscribe(() => { });
    });
  }

  excluir(acervo:Acervo):void {
    if(confirm("Quer mesmo deletar este documento?"+name)) {
			this.service.remover(acervo.id).subscribe(_ =>{
				this.dataSource.data = this.dataSource.data.filter(oldAcervo => oldAcervo.id != acervo.id);
			})
    }
  }

}

@Component({
  selector: 'dialog-mng-admin',
  templateUrl: 'dialog-mng-admin.html'
})

export class MngAdminDialog{
  public tipo_dialogo: string;
  public salvar: boolean = true;
  constructor ( public dialogRef: MatDialogRef<MngAdminDialog>, 
  @Inject(MAT_DIALOG_DATA) public data: Acervo) {}

  onNoClick(): void{
		this.salvar = false;
    this.dialogRef.close();
  }  

}

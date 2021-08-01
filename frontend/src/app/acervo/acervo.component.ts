import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import { AcervoService } from '../_services/acervo.service';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

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
  selector: 'app-acervo',
  templateUrl: './acervo.component.html',
  styleUrls: ['./acervo.component.scss']
})

export class AcervoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['titulo', 'autor', 'acoes'];
  public dataSource = new MatTableDataSource<Acervo>();

  faMenu = faEllipsisV;
  faDownload = faDownload;
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

  download(acervo: Acervo): void{
    window.open(acervo.link);
  }


openViewDialog(acervo: Acervo): void{
  const dialogRef = this.dialog.open(MngAcervoDialog, {
      width: '750px',
      data: acervo
    });
  }
}



@Component({
  selector: 'dialog-mng-acervo',
  templateUrl: 'dialog-mng-acervo.html',
  styleUrls: ['./dialog-mng-acervo.scss']
})

export class MngAcervoDialog implements OnInit {
  constructor (public dialogRef: MatDialogRef<MngAcervoDialog>, 
  @Inject(MAT_DIALOG_DATA) public data: Acervo) {}
  public orientador = true;
  public recorteTemporal = true;
  public recorteEspacial = true;
  public local = true;

  ngOnInit(){
	  if(this.data.orientador == "-"){
	    this.orientador = false;
    }

	  if(this.data.recorteTemporal == "-"){
	    this.recorteTemporal = false;
    }

	  if(this.data.recorteEspacial == "-"){
	    this.recorteEspacial = false;
    }

	  if(this.data.local == "-"){
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

import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AcervoService } from '../acervo.service';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

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
  styleUrls: ['./acervo.component.css']
})

export class AcervoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['titulo', 'autor', 'acoes'];
  public dataSource = new MatTableDataSource<Acervo>();

  faMenu = faEllipsisV;

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
  templateUrl: 'dialog-mng-acervo.html'
})

export class MngAcervoDialog {
  constructor (public dialogRef: MatDialogRef<MngAcervoDialog>, 
  @Inject(MAT_DIALOG_DATA) public data: Acervo) {}

  download(): void{
    window.open(this.data.link);
  }
  onNoClick(): void{
    this.dialogRef.close();
  }

}

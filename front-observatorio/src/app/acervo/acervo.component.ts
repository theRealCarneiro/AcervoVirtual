import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { AcervoService } from '../acervo.service';

export class Acervo{
  id!: number;
  area!: string;
  titulo!: string;
  autor!: string;
  tipo!: string;
  keyword!: string;
  data_producao!: string;
  data_topica!: string; // local de producao
  genero_documental!: string;
  tipo_documental!: string;
  apresentacao_grafica!: string;
  ambito!: string;
  notas!: string;
  link!: string;
}

@Component({
  selector: 'app-acervo',
  templateUrl: './acervo.component.html',
  styleUrls: ['./acervo.component.css']
})

export class AcervoComponent implements OnInit {  
  displayedColumns: string[] = ['titulo', 'autor', 'acoes'];
  public dataSource = new MatTableDataSource<Acervo>();

  constructor(private service: AcervoService, public dialog: MatDialog) { }

  ngOnInit(){
    this.service.getTrabalhos().subscribe(acervo => this.dataSource.data = acervo);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
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

export class MngAcervoDialog{
  constructor ( public dialogRef: MatDialogRef<MngAcervoDialog>, 
  @Inject(MAT_DIALOG_DATA) public data: Acervo) {}

  download(): void{
    window.open(this.data.link);
  }
  onNoClick(): void{
    this.dialogRef.close();
  }

}

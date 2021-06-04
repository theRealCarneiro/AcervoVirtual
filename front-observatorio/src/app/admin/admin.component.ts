import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
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
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[]=['titulo','autor','acoes'];
  dataSource = new MatTableDataSource<Acervo>();
   
  constructor(private service: AcervoService, public dialog: MatDialog) { }

  ngOnInit(){
    this.service.getTrabalhos().subscribe(acervo => this.dataSource.data = acervo);
  }

  openNewDialog(): void{
    const dialogRef = this.dialog.open(MngAdminDialog, {
      width: '750px',
      data: new Acervo()
    });

    //adiciona um novo registro (trabalho) ao acervo
    dialogRef.afterClosed().subscribe(acervo =>{
      this.service.adicionar(acervo).subscribe(id =>{
        //pega o id do novo registro 
        this.service.getTrabalho(id).subscribe(newTrabalho =>{
          //concatena ele a lista de trabalhos do front
          this.dataSource.data = this.dataSource.data.concat(newTrabalho);
        });
      });
    })
  }

  

  openEditDialog(acervo: Acervo): void{
    const dialogRef = this.dialog.open(MngAdminDialog, {
      width: '750px',
      data: acervo
    });

    //adiciona um novo registro (trabalho) ao acervo
    dialogRef.afterClosed().subscribe(acervo =>{
      this.service.editar(acervo).subscribe(_ =>{
        //altera todas os objetos se a condicao for satisfeita
        //se o id existe, substitua
        this.dataSource.data = this.dataSource.data.map(oldAcervo =>{
          if(oldAcervo.id == acervo.id) return acervo;
        })
      });
    })
  }

  exluir(acervo:Acervo):void {
    this.service.remover(acervo.id).subscribe(_ =>{
      this.dataSource.data = this.dataSource.data.filter(oldAcervo => oldAcervo.id != acervo.id);
    })

  }
}

@Component({
  selector: 'dialog-mng-admin',
  templateUrl: 'dialog-mng-admin.html'
})

export class MngAdminDialog{
  constructor ( public dialogRef: MatDialogRef<MngAdminDialog>, 
  @Inject(MAT_DIALOG_DATA) public data: Acervo) {}

  onNoClick(): void{
    this.dialogRef.close();
  }  

}
import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { Usuario } from 'src/app/_model/usuario';

@Component({
  selector: 'app-usuario-rol',
  templateUrl: './usuario-rol.component.html',
  styleUrls: ['./usuario-rol.component.css']
})
export class UsuarioRolComponent implements OnInit {

  cantidad: number = 0;
  dataSource: MatTableDataSource<Usuario>;
  displayedColumns = ['idUsuario', 'username', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private usuarioService: UsuarioService, private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.usuarioService.usuarioCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });

    this.usuarioService.mensajeCambio.subscribe(data => {
      this.snack.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.usuarioService.listarPageable(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  mostrarMas(e: any) {
    this.usuarioService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { MenuService } from 'src/app/_service/menu.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RolService } from 'src/app/_service/rol.service';
import { MatSnackBar } from '@angular/material';
import { Rol } from 'src/app/_model/rol';
import { switchMap } from 'rxjs/operators';
import { Menu } from 'src/app/_model/menu';

@Component({
  selector: 'app-menu-rol-edicion',
  templateUrl: './menu-rol-edicion.component.html',
  styleUrls: ['./menu-rol-edicion.component.css']
})
export class MenuRolEdicionComponent implements OnInit {

  roles: Rol[];
  nuevosRoles: Rol[] = [];
  rolesActuales: Rol[] = [];
  idRolSeleccionado: number;

  form: FormGroup;
  id: number;
  edicion: boolean;
  mensaje: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService,
    private rolService: RolService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.listarRoles();
    this.form = new FormGroup({
      'idMenu': new FormControl(0),
      'nombre': new FormControl(''),
      'icono': new FormControl(''),
      'url': new FormControl(''),
      'roles': new FormArray([
        new FormGroup({
          'idRol': new FormControl(0),
          'nombre': new FormControl(''),
          'descripcion': new FormControl('')
        })
      ])
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  listarRoles() {
    this.rolService.listar().subscribe(data => {
      this.roles = data;
    });
  }

  initForm() {
    debugger;
    if (this.edicion) {
      this.menuService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'idMenu': new FormControl(data.idMenu),
          'nombre': new FormControl(data.nombre),
          'icono': new FormControl(data.icono),
          'url': new FormControl(data.url),
          'roles': new FormControl(data.roles)
        });
        this.rolesActuales = data.roles;
      });
    }
  }

  get f() { return this.form.controls; }

  operar() {
    debugger;
    if (this.nuevosRoles.length <= 0) {
      this.mensaje = 'No se han agregado roles!!';
      this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      return;
    } else {
      let menu = new Menu();
      menu = { ...this.form.value };
      menu.roles = this.nuevosRoles;

      this.menuService.modificar(menu).pipe(switchMap(() => {
        return this.menuService.listar();
      })).subscribe(data => {
        this.menuService.menuCambio.next(data);
        this.menuService.mensajeCambio.next('Se cambiaron los roles para acceder al menu!');
      });
    }

    this.router.navigate(['menu-rol']);
  }

  agregarRol() {
    const rolNuevo = this.roles.find(r => r.idRol === this.idRolSeleccionado);
    if (rolNuevo && !this.nuevosRoles.includes(rolNuevo)) {
      console.log(this.nuevosRoles);
      this.nuevosRoles.push(rolNuevo);
    } else {
      this.mensaje = 'Ya se encuentra agregado el rol!';
      this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
    }
  }

  removerRol(index: number) {
    this.nuevosRoles.splice(index, 1);
  }

}

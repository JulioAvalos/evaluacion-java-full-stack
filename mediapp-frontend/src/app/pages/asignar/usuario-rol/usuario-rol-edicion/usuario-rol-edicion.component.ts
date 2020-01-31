import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { RolService } from 'src/app/_service/rol.service';
import { Usuario } from 'src/app/_model/usuario';
import { Rol } from 'src/app/_model/rol';
import { MatSnackBar } from '@angular/material';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-rol-edicion',
  templateUrl: './usuario-rol-edicion.component.html',
  styleUrls: ['./usuario-rol-edicion.component.css']
})
export class UsuarioRolEdicionComponent implements OnInit {

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
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.listarRoles();
    this.form = new FormGroup({
      'idUsuario': new FormControl(0),
      'username': new FormControl(''),
      'password': new FormControl(''),
      'enabled': new FormControl(''),
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
    if (this.edicion) {
      this.usuarioService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'idUsuario': new FormControl(data.idUsuario),
          'username': new FormControl(data.username),
          'password': new FormControl(data.password),
          'enabled': new FormControl(data.enabled),
          'roles': new FormControl(data.roles)
        });
        this.rolesActuales = data.roles;
      });
    }
  }

  get f() { return this.form.controls; }

  operar() {
    if (this.nuevosRoles.length <= 0) {
      this.mensaje = 'No se han agregado roles!!';
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
      return;
    } else {
      let usuario = new Usuario();
      usuario = { ...this.form.value };
      usuario.roles = this.nuevosRoles;

      this.usuarioService.modificar(usuario).pipe(switchMap(() => {
        return this.usuarioService.listar();
      })).subscribe(data => {
        this.usuarioService.usuarioCambio.next(data);
        this.usuarioService.mensajeCambio.next('Se cambiaron los roles de usuario!');
      });
    }

    this.router.navigate(['usuario-rol']);
  }

  agregarRol() {
    const rolNuevo = this.roles.find(r => r.idRol === this.idRolSeleccionado);
    if (rolNuevo && !this.nuevosRoles.includes(rolNuevo)) {
      console.log(this.nuevosRoles);
      this.nuevosRoles.push(rolNuevo);
    } else {
      this.mensaje = 'Ya se encuentra agregado el rol!';
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  removerRol(index: number) {
    this.nuevosRoles.splice(index, 1);
  }
}

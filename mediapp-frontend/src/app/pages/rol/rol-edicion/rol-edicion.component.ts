import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RolService } from 'src/app/_service/rol.service';
import { Rol } from 'src/app/_model/rol';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-rol-edicion',
  templateUrl: './rol-edicion.component.html',
  styleUrls: ['./rol-edicion.component.css']
})
export class RolEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rolService: RolService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'idRol': new FormControl(0),
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'descripcion': new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.rolService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'idRol': new FormControl(data.idRol),
          'nombre': new FormControl(data.nombre),
          'descripcion': new FormControl(data.descripcion)
        });
      });
    }
  }

  get f() { return this.form.controls; }



  operar() {
    //TE ASEGURAS QUE EL FORM ESTE VALIDO PARA PROSEGUIR
    if (this.form.invalid) {
      return;
    }
    let rol = new Rol();
    rol = { ...this.form.value };
    if (this.edicion) {
      //servicio de edicion
      this.rolService.modificar(rol).pipe(switchMap(() => {
        return this.rolService.listar();
      })).subscribe(data => {
        this.rolService.rolCambio.next(data);
        this.rolService.mensajeCambio.next('SE MODIFICO');
      });
    } else {
      //servicio de registro
      this.rolService.registrar(rol).pipe(switchMap(() => {
        return this.rolService.listar();
      })).subscribe(data => {
        this.rolService.rolCambio.next(data);
        this.rolService.mensajeCambio.next('SE REGISTRO');
      });
    }
    this.router.navigate(['rol']);
  }

}

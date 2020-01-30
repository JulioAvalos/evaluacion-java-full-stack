import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MenuService } from 'src/app/_service/menu.service';
import { Menu } from 'src/app/_model/menu';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-menu-edicion',
  templateUrl: './menu-edicion.component.html',
  styleUrls: ['./menu-edicion.component.css']
})
export class MenuEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'idMenu': new FormControl(0),
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'url': new FormControl(''),
      'icono': new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.menuService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'idMenu': new FormControl(data.idMenu),
          'nombre': new FormControl(data.nombre),
          'url': new FormControl(data.url),
          'icono': new FormControl(data.icono)
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
    let menu = new Menu();
    menu = { ...this.form.value };
    if (this.edicion) {
      //servicio de edicion
      this.menuService.modificar(menu).pipe(switchMap(() => {
        return this.menuService.listar();
      })).subscribe(data => {
        this.menuService.menuCambio.next(data);
        this.menuService.mensajeCambio.next('SE MODIFICO');
      });
    } else {
      //servicio de registro
      this.menuService.registrar(menu).pipe(switchMap(() => {
        return this.menuService.listar();
      })).subscribe(data => {
        this.menuService.menuCambio.next(data);
        this.menuService.mensajeCambio.next('SE REGISTRO');
      });

    }
    this.router.navigate(['menu']);
  }

}

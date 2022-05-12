import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuarioCivil } from 'src/app/modelos/index.models';
import { UsuarioCivilService } from 'src/app/servicios/index.service';

@Component({
  selector: 'app-combo-sexo',
  templateUrl: './combo-sexo.component.html',
  styleUrls: ['./combo-sexo.component.scss']
})
export class ComboSexoComponent implements OnInit {

  @Input()
  set dibujar(item: UsuarioCivil) {
    this.item = item;
  }

  item: UsuarioCivil;
  items: UsuarioCivil[];
  @Output()
  emity: EventEmitter<UsuarioCivil> = new EventEmitter<UsuarioCivil>();
  @Output()
  opcionseleccionada!: UsuarioCivil;

  constructor(private wsdl: UsuarioCivilService) {
    this.item = new UsuarioCivil();
    this.items = [];
    this.listar();
    // this.opcionseleccionada = "";
  }

  ngOnInit(): void {
    this.listar();
  }
  //captura el dato del combo

  capturar(event: UsuarioCivil) {
    this.item = event;
    //Swal.fire(event.nombre)
    //console.log(event.nombre)
    this.emity.emit(this.item);
  }

  compareFnPer(c1: UsuarioCivil, c2: UsuarioCivil): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  listar() {
    this.wsdl.getList(1, 100).then((data: any) => {
      this.items = data.data.docs;
      this.items.sort((x: any, y: any) => {
        if (x.nombre > y.nombre) {
          return 1;
        }
        if (x.nombre < y.nombre) {
          return -1;
        }
        return 0;
      });
    });
  }

}

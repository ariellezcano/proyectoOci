import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tematica } from 'src/app/modelos/index.models';
import { TematicaService } from 'src/app/servicios/index.service';

@Component({
  selector: 'app-combo-tematica',
  templateUrl: './combo-tematica.component.html',
  styleUrls: ['./combo-tematica.component.scss'],
})
export class ComboTematicaComponent implements OnInit {
  @Input()
  set dibujar(item: Tematica) {
    this.item = item;
  }

  item: Tematica;
  items: Tematica[];
  @Output()
  emity: EventEmitter<Tematica> = new EventEmitter<Tematica>();
  @Output()
  opcionseleccionada!: Tematica;

  constructor(private wsdl: TematicaService) {
    this.item = new Tematica();
    this.items = [];
    this.listar();
    // this.opcionseleccionada = "";
  }

  ngOnInit(): void {
    this.listar();
  }
  //captura el dato del combo

  capturar(event: Tematica) {
    this.item = event;
    //Swal.fire(event.nombre)
    //console.log(event.nombre)
    this.emity.emit(this.item);
  }

  compareFnPer(c1: Tematica, c2: Tematica): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  listar() {
    this.wsdl.getList(1, 100).then((data: any) => {
      this.items = data.data;
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

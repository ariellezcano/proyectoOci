import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsuarioOci } from 'src/app/modelos/index.models';
import { UsuariosOciService } from 'src/app/servicios/componentes/usuarios-oci.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';

@Component({
  selector: 'app-fil-usuario-oci',
  templateUrl: './fil-usuario-oci.component.html',
  styleUrls: ['./fil-usuario-oci.component.scss']
})
export class FilUsuarioOciComponent implements OnInit {

  @Output()
  filter: EventEmitter<UsuarioOci[]> = new EventEmitter<UsuarioOci[]>();

  items: UsuarioOci[];
  itemss: UsuarioOci[];
  cargando: Boolean = false;
  procesando: Boolean;
  public search!: string;
  /* Searcheable table Filter */
  public limit: any;
  public page: any;
  public nextPage!: Number;
  public prevPage: any;
  public data: any
  public lastPage!: Number;
  public count!: Number;
  public limits: Number[] = [5, 10, 25, 50, 100, 150, 200, 500, 1000];

  setPage(page: any) {
    this.page = page;
    this.list();
  }

  constructor(private wsdl: UsuariosOciService) {
    this.procesando = false;
    this.limit = 5;
    this.page = 1;
    this.items = [];
  }

  ngOnInit() {
    this.list();
  }

  public async list() {
    try {
      this.items = [];
      this.itemss = [];
      if (this.search === undefined || this.search == "") {
        this.cargando = true;
        this.procesando = true;
        let d = this.search;
        if (d) {
          this.limit = 5;
          this.page = 1;
          this.search = '';        }
          this.data = await this.wsdl.getList().then();
          console.log("data enviada", this.data)
      }
      const result = JSON.parse(JSON.stringify(this.data));
      console.log(result);
      if (result.code == 200) {
        this.itemss=result.data.docs
        this.itemss.forEach((element) => {
          if (!element.baja) {
            this.items.push(element);
          }
        });
        this.filter.emit(this.items);
        this.page = parseInt(result.data.paginate.page);
        this.lastPage = parseInt(result.data.paginate.lastPage);
        this.nextPage = parseInt(result.data.paginate.nextPage);
        this.prevPage = parseInt(result.data.paginate.prevPage);
        this.count = parseInt(result.data.paginate.count);
        this.cargando = false;
        this.procesando = false;
      } else {
        this.filter.emit([]);
        //console.log(result.msg);
        UturuncoUtils.showToas(result.msg, 'error');
      }
      this.procesando = false;
    } catch (error) {
      this.procesando = false;
      this.cargando = false;
      UturuncoUtils.showToas('Error', 'error');
    } finally {
      this.procesando = false;
      this.cargando = false;
    }
  }
}

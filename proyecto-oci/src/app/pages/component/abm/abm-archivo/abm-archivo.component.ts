import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { Archivo, Unidad } from 'src/app/modelos/index.models';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-abm-archivo',
  templateUrl: './abm-archivo.component.html',
  styleUrls: ['./abm-archivo.component.scss'],
})
export class AbmArchivoComponent implements OnInit {
  archivo!: Observable<any>;

  item: Archivo;

  entity = 'lst-archivos';

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.item = new Archivo();
  }

  ngOnInit(): void {
    // try {
    //   this.item = JSON.parse(localStorage.getItem('b64')!);
    //   if (this.item != undefined) {
    //     this.ver(this.item);
    //   }
    // } catch (error) {
    // }
  }

  doAction(f: NgForm) {
    /* validar */

    if (f.valid) {
      if (this.item.id > 0) {
        //editar
        //  this.doEdit();
      } else {
        //this.doCreate();

        localStorage.setItem('b64', JSON.stringify(this.item));
      }
    } else {
      alert('Validar');
    }
    // console.log("base64 "+this.item.fileb64)
  }

  onChange($event: Event) {
    /*Obtengo el archivo file*/
    const file = ($event.target as HTMLInputElement).files![0];

    /**previsualizar archivo */
    const filereader = new FileReader();
    // filereader.onload = function (e) {
    //   document.getElementById('visorArchivo')!.innerHTML =
    //     '<embed src="' + e.target!.result + '" width="400px" height="300px" alt="" ">';
    // }
    filereader.readAsDataURL(file);

    this.item.tipoArchivo.extension = file.type;

    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    /*convertimos el archivo a base64*/
    this.archivo = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    this.archivo.subscribe((d) => {
      this.item.tipoArchivo.archivo = d;
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  unidad(event: Unidad) {
    this.item.unidadOrigen = event;
  }

  ver(item: Archivo) {
    let html =
      '<embed width="100%" height="300px" src="' +
      item.tipoArchivo.archivo +
      '" type="' +
      item.tipoArchivo.extension +
      '" />';
    let s = this.sanitizer.bypassSecurityTrustHtml(html);
    // console.log(s)
    return s;
  }

  back() {
    this.router.navigateByUrl(this.entity.toLowerCase());
  }
}

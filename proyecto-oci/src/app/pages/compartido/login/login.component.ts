import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import { UserxsService, UsuarioService } from 'src/app/servicio/index.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [style({ opacity: 0 }), animate(900)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave', animate(600, style({ opacity: 0 }))),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  //  @ViewChild('closed', { static: true }) closed: ElementRef;
  //  @ViewChild('closed', { static: true }) closed: ElementRef;

  @ViewChild('closedRestore')
  closedRestore!: ElementRef;
  @ViewChild('usercuit')
  usercuit!: ElementRef;
  @ViewChild('password')
  password!: ElementRef;
  @ViewChild('datosss')
  registrobtn!: ElementRef;

  permitido: string[] = [
    '38870624',
    '31325601',
    '31909503',
    '31909760',
    '38122139',
    '31698876',
    '28510864',
  ];

  public proccess: Boolean;
  public isUser!: boolean;
  public download!: string;
  public cuit: any;
  public pass: any;
  public anim: any;

  public error: Boolean;

  public dniRestore: any;
  public fechaRestore: any;
  public credencialRestore: any;

  public user: any;

  public query!: string;
  public dataJSON: any;

  constructor(
    private route_: ActivatedRoute,
    private route: Router,
    private renderer: Renderer2,
    private wsdl: UserxsService,
    private wsdlu: UsuarioService
  ) {
    this.proccess = false;
    this.error = false;
    this.dataJSON = { contacto: { Nro: '' } };
  }

  ngAfterViewInit(): void {}

  ngOnInit() {
    // this.isUser = false;
    // this.route_.queryParams.subscribe(params => {
    //   try {
    //     if (params.code !== undefined && params.code.length === 'ZTNkYTk3ZmFhMDhmZDI0NjgxZTA0Yjk0OGE1Y2Y2NzE2OGFiYzg0YWM5YjEyNDBlZTQ0OTk3NzEwNThhNTE4Mw'.length) {
    //     }
    //   } catch (error) {
    //     this.proccess = false;
    //     Swal.fire('Oops...', error, 'error')
    //   }
    // });
    // this.route_.paramMap.subscribe((params: Params) => {
    //   let dataquery = JSON.parse(params.params.state);
    //   this.query = dataquery.apellidos;
    //   this.dataJSON = dataquery;
    //   console.log("DATA", dataquery)
    //   this.cuit = dataquery.tiposDocumentoPersona[0].numeroDocumento;
    // });
  }

  async login22() {
    try {
      if (this.cuit) {
        this.proccess = true;
        let data = await this.wsdl.doLogin(this.cuit).then();
        console.log(this.cuit, data);

        this.proccess = false;

        let res = JSON.parse(JSON.stringify(data));
        if (res.code === 200) {
          if (res.password) {
            this.isUser = true;
            await this.delay(900);
            this.password.nativeElement.focus();
          } else {
            Swal.fire(
              'Oops...',
              'Ud no esta registrado en nuestra aplicacion presione registrarse y complete el formulario',
              'info'
            );
            this.dataJSON.dni = this.cuit;
          }
        } else {
          this.cuit = undefined;
          Swal.fire('Oops...', res.msg, 'error');
        }
      } else {
        Swal.fire('Oops...', 'Ingrese un DNI Valido', 'error');
      }
    } catch (error) {
      this.proccess = false;
      Swal.fire('Oops...', '' + error, 'error');
    }
  }
  async login() {
    try {
      if (this.permitido.indexOf(this.cuit + '') != -1) {
        if (this.cuit) {
          this.proccess = true;
          let data = await this.wsdl.doLogin111(this.cuit).then();

          this.proccess = false;

          let res = JSON.parse(JSON.stringify(data));
          if (res.code === 200) {
            if (res.password) {
              this.isUser = true;
              await this.delay(900);
              this.password.nativeElement.focus();
            } else {
              Swal.fire(
                'Oops...',
                'Ud no esta registrado en nuestra aplicacion presione registrarse y complete el formulario',
                'info'
              );
              this.dataJSON.dni = this.cuit;
            }
          } else {
            this.cuit = undefined;
            Swal.fire('Oops...', res.msg, 'error');
          }
        } else {
          Swal.fire('Oops...', 'Ingrese un DNI Valido', 'error');
        }
      } else {
        alert('Usted no esta autorizado a ingresar al Sistema');
      }
    } catch (error) {
      this.proccess = false;
      Swal.fire('Oops...', '' + error, 'error');
    }
  }

  async login2() {
    try {
      this.proccess = true;
      let data = await this.wsdlu.doLogin(this.cuit, this.pass).then();
      let res = JSON.parse(JSON.stringify(data));

      if (res.code === 200) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });

        Toast.fire({
          icon: 'success',
          title: 'Bienvenido Sr/a:' + res.data.apellido,
        });
        UturuncoUtils.setSession('user', JSON.stringify(res.data));
        UturuncoUtils.setSession('personal', JSON.stringify(res.policial));

        this.route.navigate(['/principal']);
      } else {
        Swal.fire('Oops...', res.msg, 'error');
      }
      this.proccess = false;
    } catch (error) {
      Swal.fire('Oops...', 'Algo salio mal vuelva a intentar ', 'error');
      this.proccess = false;
    }
  }

  removeClassPass() {
    this.renderer.removeClass(this.password.nativeElement, 'invisible');
    this.anim = 'in';
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  cerrar() {
    this.error = !this.error;
  }

  getRR() {
    return this.proccess;
  }
}

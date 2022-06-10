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
import { RegistroUsuarioService, UsuariosOciService } from 'src/app/servicios/index.service';

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

  public proccess: Boolean;
  public isUser!: boolean;
  public download!: string;
  public cuit: any;
  public pass: any;
  public anim: any;

  public id!: number;
  public rol: any;


  public error: Boolean;

  datosPersonal!: any;
  nombre!: string;
  apellido!: string;
  item!: any;

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
    
    private wsdlUsuarioOci: UsuariosOciService,
    private wsdlRegistro: RegistroUsuarioService,
  
    ) {
    this.proccess = false;
    this.error = false;
    this.dataJSON = { contacto: { Nro: '' } };
  }

  ngAfterViewInit(): void {}

  ngOnInit() {

  }

  
  async login() {
      try {
          if (this.cuit && this.pass)  {
            this.proccess = true;
            let data = await this.wsdlRegistro.getLogin(this.cuit, this.pass).then();
            //console.log('res', data);
            this.proccess = false;
            let res = JSON.parse(JSON.stringify(data));
            //console.log('registro usuario login', res);
            console.log('registro usuario login', res.code);
            if (res.code == 200) {
             // this.route.navigate(['/principal']);
              this.id = res.data;
              //console.log("data:", this.id)
              this.login2();
            } else if(res.code == 204){
              this.cuit = "";
              this.pass = "";
              Swal.fire({
                icon: 'error',
                title: 'Alerta...',
                text: 'Usted no se encuentra registrado en el Sistema RePO',
              })
            } else {
              this.cuit = undefined;
              Swal.fire('Alerta...', res.msg, 'error');
            }
          } else {
            Swal.fire('Alerta...', 'Ingrese datos validos', 'warning');
          }
      } catch (error) {
        this.proccess = false;
        Swal.fire('Oops...', '' + error, 'error');
      }
    
  }

  async login2() {
    try {
      this.proccess = true;
      let data = await this.wsdlUsuarioOci.doFind(this.id).then();
      let res = JSON.parse(JSON.stringify(data));
      //console.log("respuesta login 2", res)
      if (res.code == 200) {
        //console.log('registro usuario login 2', res.code);
        this.item = res.data
        //console.log('item', this.item)
        if(!this.item.baja && this.item.activo){
          //console.log("baja verificar", this.item.baja)
          this.apellido = res.data.datosPersonal.apellido;
          this.nombre = res.data.datosPersonal.nombre;
          this.rol = res.data.datosPersonal.rol;
          this.datosPersonal = {
            apellido: this.apellido,
            nombre: this.nombre,
            rol: this.rol,
          }
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
          Toast.fire({
            icon: 'success',
            title: 'Bienvenido Sr/a: ' + res.data.datosPersonal.apellido,
         });
          UturuncoUtils.setSession('user', JSON.stringify(res.data.id));
          UturuncoUtils.setSession('personal', JSON.stringify(this.datosPersonal));
          this.route.navigate(['/principal']);  
        }
        else{
          Swal.fire({
            icon: 'warning',
            title: 'Alerta...',
            text: 'Usuario dado de baja, contáctese con el administrador del sistema!',
          })
        }
      }else if(res.code == 401){
        Swal.fire(
          'Usuario no habilitado',
          'Por favor contáctese con el administrador del sistema para generar su usuario',
          'info'
        )
      }
       else {
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

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UturuncoUtils } from "src/app/utils/uturuncoUtils";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  usuario: string;

  constructor(private route: Router) {
    this.usuario = "";
  }

  ngOnInit() {
    this.usuario =
      JSON.parse(''+UturuncoUtils.getSession('personal')).apellido +
      " " +
      JSON.parse(''+UturuncoUtils.getSession("personal")).nombre;
    }
  
  cerrar() {
    UturuncoUtils.clearSession();
    this.route.navigate([""]);
  }
}

import { Component, OnInit } from '@angular/core';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  rol: any;
  constructor() {
    this.rol = '';
  }

  ngOnInit(): void {
    this.rol = JSON.parse('' + UturuncoUtils.getSession('personal')).rol;
  }
}

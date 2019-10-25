import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  items: NbMenuItem[] = [
    {
      title: 'Gestión',
      icon: 'person-outline',
      link: '',
      children: [
        {
          title: 'Camiones',
          link: '', // goes into angular `routerLink`
        },
        {
          title: 'INAL',
          link: '',
        },
        {
          title: 'Senasa',
          link: '',
        }
      ],
    },
    {
      title: 'Proceso',
      icon: 'lock-outline',
      link: '',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}

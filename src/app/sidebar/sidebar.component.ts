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
          link: 'trucks',
          icon: 'car'
        },
        {
          title: 'INAL',
          link: 'inal',
          icon: 'file'
        },
        {
          title: 'Senasa',
          link: 'senasa',
          icon: 'file'
        },
        {
          title: 'Productos',
          link: 'products',
          icon: 'shopping-bag'
        },
        {
          title: 'Conductores',
          link: 'drivers',
          icon: 'person'
        }
      ],
    },
    {
      title: 'Proceso',
      icon: 'settings',
      link: 'process',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}

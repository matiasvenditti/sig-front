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
        },
        {
          title: 'Ordenes de Compra',
          link: 'orders',
          icon: 'file-add'
        },
        {
          title: 'Proveedores',
          link: 'suppliers',
          icon: 'shopping-cart'
        }
      ],
    },
    {
      title: 'Proceso',
      icon: 'settings',
      link: 'process',
    },
    {
      title: 'No Conformidad',
      icon: 'alert-circle',
      link: '',
      children: [
        {
          title: 'Documentación',
          icon: 'archive',
          link: 'non-conformity-documentation'
        },
        {
          title: 'Calidad',
          icon: 'archive',
          link: 'non-conformity-quality'
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}

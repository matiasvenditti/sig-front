import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { CreateSenasaComponent } from './create-senasa/create-senasa.component';
import { SenasaService } from '../services/senasa/senasa.service';
import { DeleteSenasaComponent } from './delete-senasa/delete-senasa.component';
import { Senasa } from '../model/senasa';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}

@Component({
  selector: 'app-senasa',
  templateUrl: './senasa.component.html',
  styleUrls: ['./senasa.component.scss']
})
export class SenasaComponent implements OnInit {
  
  private countries: string[];

  customColumn = 'action';
  defaultColumns = ['denomination', 'businessName', 'country', 'certification', 'expirationDate', 'product'];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<Senasa>;

  private senasaMock: Senasa[] = [
    {denomination: 'Denomination 1', businessName: 'Business Name 1', country: 'Argentina', certification: true, expirationDate: new Date(), product: null},
    {denomination: 'Denomination 2', businessName: 'Business Name 2', country: 'Chile', certification: false, expirationDate: new Date(), product: null},
    {denomination: 'Denomination 3', businessName: 'Business Name 3', country: 'Uruguay', certification: false, expirationDate: new Date(), product: null},
    {denomination: 'Denomination 4', businessName: 'Business Name 4', country: 'Argentina', certification: true, expirationDate: new Date(), product: null},
  ]

  data: TreeNode<Senasa>[] = this.senasaMock.map(elem => {return {data: elem}});

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<Senasa>, private dialogService: NbDialogService, private senasaService: SenasaService) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  ngOnInit() {
    this.senasaService.getAll().subscribe((response) => {
      console.log(response);
    })
  }

  open() {
    this.dialogService.open(CreateSenasaComponent)
  }

  delete(senasa: any) {
    this.dialogService.open(DeleteSenasaComponent, {context: {senasa: senasa}})
  }

}
